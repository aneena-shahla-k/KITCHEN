import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import "../../styles/HomeStyles/kitchenHero.css";

const TOTAL_FRAMES = 240;
const TRANSITION_FRAME = 20;

// How many frames to prefetch ahead of the current scroll position on mobile.
// This is the main fix for "freezes mid-scroll": the old code only ever
// fetched the exact frame needed at that instant, so on a real network
// (unlike localhost) fast scrolling always outran the fetch.
const MOBILE_PREFETCH_WINDOW = 8;

const KitchenHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameId = useRef(null);
  const lastDrawnFrameRef = useRef(-1);
  const currentFrameRef = useRef(1);
  const scrollDirRef = useRef(1); // +1 = scrolling down, -1 = scrolling up

  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const pendingFrameIndexRef = useRef(null);
  const lastDrawTimeRef = useRef(0);

  const audioRef = useRef(null);
  const soundTriggeredRef = useRef(false);
  const isUnlockedRef = useRef(false);

  // Holds the latest renderFrame so prefetch callbacks (defined earlier in
  // the closure chain) can call it without creating a circular useCallback
  // dependency.
  const renderFrameRef = useRef(() => {});

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    setIsMobileDevice(isMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  /* ================================
     CANVAS SIZE SETUP
  ================================ */
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    const displayWidth = Math.floor(rect.width) || window.innerWidth;
    const displayHeight = Math.floor(rect.height) || window.innerHeight;

    const pixelWidth = displayWidth * dpr;
    const pixelHeight = displayHeight * dpr;

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    canvasSizeRef.current = { width: pixelWidth, height: pixelHeight, dpr };
  }, []);

  /* ================================
     A SINGLE IMAGE LOADER (used by both the exact-frame fetch and prefetch)
  ================================ */
  const loadFrameImage = useCallback((idx, { isRetry = false } = {}) => {
    if (idx < 1 || idx > TOTAL_FRAMES) return;
    const imgIndex = idx - 1;

    // Already loaded or currently in-flight (and not a deliberate retry) - skip.
    if (imagesRef.current[imgIndex] && !isRetry) return;

    const img = new Image();
    img.decoding = "async";
    const frame = String(idx).padStart(3, "0");
    img.src = `/kitchen/ezgif-frame-${frame}.webp`;

    img.onload = () => {
      // If the user is still near this frame, trigger a redraw.
      if (Math.abs(currentFrameRef.current - idx) <= 10) {
        renderFrameRef.current(currentFrameRef.current);
      }
    };

    // FIX: the old code silently gave up on a failed/slow load and just kept
    // falling back to whatever frame *was* loaded (often frame 1 forever,
    // which is exactly what a permanent "freeze" looks like). Retry once
    // after a short delay before giving up for good.
    img.onerror = () => {
      imagesRef.current[imgIndex] = null;
      if (!isRetry) {
        setTimeout(() => loadFrameImage(idx, { isRetry: true }), 700);
      }
    };

    imagesRef.current[imgIndex] = img;
  }, []);

  /* ================================
     COALESCED DRAW CALLBACK
  ================================ */
  const drawCallback = useCallback(() => {
    const targetIndex = pendingFrameIndexRef.current;
    if (targetIndex === null) return;
    pendingFrameIndexRef.current = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let image = imagesRef.current[targetIndex - 1];
    if (!image || !image.complete) {
      let step = 1;
      while (targetIndex - step >= 1 || targetIndex + step <= TOTAL_FRAMES) {
        if (targetIndex - step >= 1) {
          const img = imagesRef.current[targetIndex - 1 - step];
          if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            image = img;
            break;
          }
        }
        if (targetIndex + step <= TOTAL_FRAMES) {
          const img = imagesRef.current[targetIndex - 1 + step];
          if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            image = img;
            break;
          }
        }
        step++;
      }
    }

    // FIX: also guard naturalHeight, not just naturalWidth - a 0-height
    // image produces an Infinity/NaN draw size and ctx.drawImage() throws,
    // which (since this runs inside rAF) silently kills that frame's draw
    // and can strand the canvas on the last good frame.
    if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
      return;
    }

    let { width: canvasWidth, height: canvasHeight } = canvasSizeRef.current;
    if (canvasWidth === 0 || canvasHeight === 0) {
      updateCanvasDimensions();
      ({ width: canvasWidth, height: canvasHeight } = canvasSizeRef.current);
    }
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    try {
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameRef.current = targetIndex;
    } catch (err) {
      // Never let a single bad frame permanently wedge the canvas.
      console.warn(`Failed to draw frame ${targetIndex}:`, err);
    }
  }, [updateCanvasDimensions]);

  /* ================================
     RENDER INITIATION (mobile prefetch window + 30fps throttle)
  ================================ */
  const renderFrame = useCallback((index) => {
    const targetIndex = Math.min(Math.max(Math.round(index), 1), TOTAL_FRAMES);

    if (targetIndex === lastDrawnFrameRef.current) return;

    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

    if (isMobile) {
      // Track direction so we prefetch ahead of where the user is heading,
      // not behind them.
      scrollDirRef.current = targetIndex >= currentFrameRef.current ? 1 : -1;

      // Load the exact frame needed now...
      loadFrameImage(targetIndex);

      // ...and a window of frames ahead of scroll direction, so the fetch
      // is already in flight by the time the user scrolls there instead of
      // starting cold on arrival (this is what actually fixes the freeze).
      for (let i = 1; i <= MOBILE_PREFETCH_WINDOW; i++) {
        loadFrameImage(targetIndex + i * scrollDirRef.current);
      }

      const now = performance.now();
      if (now - lastDrawTimeRef.current < 33) {
        currentFrameRef.current = targetIndex; // still track position while throttled
        return;
      }
      lastDrawTimeRef.current = now;
    }

    currentFrameRef.current = targetIndex;
    pendingFrameIndexRef.current = targetIndex;

    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(() => {
        animFrameId.current = null;
        drawCallback();
      });
    }
  }, [drawCallback, loadFrameImage]);

  useEffect(() => {
    renderFrameRef.current = renderFrame;
  }, [renderFrame]);

  /* ================================
     AUDIO SETUP
  ================================ */
  useEffect(() => {
    const audio = new Audio("/audio/shutter.mp3");
    audio.volume = 0.8;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (audioRef.current && !isUnlockedRef.current) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            isUnlockedRef.current = true;
          })
          .catch(() => {});
      }
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playShutterSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  /* ================================
     HYBRID ASSET LOADING PIPELINE
  ================================ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      contextRef.current = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      updateCanvasDimensions();
    }

    let isMounted = true;
    const loadedImages = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

    const loadFirstFrame = async () => {
      const img = new Image();
      img.decoding = "async";
      img.src = `/kitchen/ezgif-frame-001.webp`;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[0] = img;
        setReady(true);
        renderFrameRef.current(1);
        if (!isMobile) preloadDesktopFrames();
      };
      img.onerror = () => {
        if (!isMounted) return;
        setReady(true);
        if (!isMobile) preloadDesktopFrames();
      };
      loadedImages[0] = img;
    };

    const preloadDesktopFrames = async () => {
      const queue = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1);
      const concurrency = 6;

      const worker = async () => {
        while (queue.length > 0 && isMounted) {
          const nextIndex = queue.shift();
          if (nextIndex !== undefined) {
            await loadSingleFrame(nextIndex);
          }
        }
      };

      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);
    };

    const loadSingleFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const frame = String(index + 1).padStart(3, "0");
        img.src = `/kitchen/ezgif-frame-${frame}.webp`;

        img.onload = () => {
          if (!isMounted) return resolve();
          img
            .decode()
            .then(() => {
              if (!isMounted) return;
              loadedImages[index] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / (TOTAL_FRAMES - 1)) * 100));
            })
            .catch(() => {
              if (!isMounted) return;
              loadedImages[index] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / (TOTAL_FRAMES - 1)) * 100));
            })
            .finally(() => resolve());
        };

        img.onerror = () => {
          if (!isMounted) return resolve();
          resolve();
        };
      });
    };

    imagesRef.current = loadedImages;
    loadFirstFrame();

    const handleResize = () => {
      updateCanvasDimensions();
      renderFrameRef.current(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const unsubscribe = frameIndex.on("change", (latest) => {
      const frame = Math.round(latest);

      if (frame >= TRANSITION_FRAME && !soundTriggeredRef.current) {
        playShutterSound();
        soundTriggeredRef.current = true;
      } else if (frame < TRANSITION_FRAME - 12) {
        soundTriggeredRef.current = false;
      }

      renderFrameRef.current(frame);
    });

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      imagesRef.current = [];
    };
  }, [frameIndex, updateCanvasDimensions]);

  const percentageText = isMobileDevice ? (ready ? 100 : 0) : loadProgress;

  return (
    <section ref={heroRef} className="kitchen-hero" id="home">
      <div className="kitchen-animation">
        <canvas
          ref={canvasRef}
          className="kitchen-canvas"
          style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
        />

        {!ready && (
          <div className="kitchen-loading">
            <div className="loading-line" />
            <span style={{ fontSize: "10px", marginTop: "10px", opacity: 0.6 }}>
              {percentageText}%
            </span>
          </div>
        )}

        <div className="kitchen-overlay" />

        <div className="kitchen-hero-content">
          <span className="kitchen-eyebrow">DESIGN · CREATE · INSPIRE</span>
          <h1>
            Designing
            <br />
            Your Space.
          </h1>
          <p>Custom kitchens crafted around your lifestyle.</p>

          <div className="kitchen-actions">
            <a href="#styles" className="kitchen-primary">
              Explore Kitchens
              <ArrowRight size={16} />
            </a>

            <button className="kitchen-showreel" type="button">
              <span className="kitchen-play">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Experience
            </button>
          </div>
        </div>

        <div className="kitchen-stats">
          <div>
            <strong>10+</strong>
            <span>Years Experience</span>
          </div>
          <div>
            <strong>850+</strong>
            <span>Projects Completed</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>Client Satisfaction</span>
          </div>
        </div>

        <div className="kitchen-scroll">
          <span>SCROLL</span>
          <div className="scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default KitchenHero;