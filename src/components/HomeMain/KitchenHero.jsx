import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import "../../styles/HomeStyles/kitchenHero.css";

const TOTAL_FRAMES = 240;
const TRANSITION_FRAME = 20;

const KitchenHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const animationFrameRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  // Audio Refs
  const audioRef = useRef(null);
  const soundTriggeredRef = useRef(false);
  const isUnlockedRef = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  /* ================================
     CANVAS SIZE SETUP (On Resize Only)
     Capped at dpr = 1 for mobile to save GPU processing
  ================================ */
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    // Cap DPR to 1 on mobile to prevent GPU lagging
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(rect.width * dpr);
    const pixelHeight = Math.round(rect.height * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    canvasSizeRef.current = {
      width: rect.width,
      height: rect.height,
      dpr,
    };

    if (contextRef.current) {
      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  /* ================================
     OPTIMIZED DRAW FUNCTION (With Nearest-Frame Fallback)
  ================================ */
  const renderFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const targetIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNumber - 1));
    let image = imagesRef.current[targetIndex];

    // If frame is skipped/not loaded, search for the nearest loaded frame
    if (!image || !image.complete) {
      let step = 1;
      while (targetIndex - step >= 0 || targetIndex + step < TOTAL_FRAMES) {
        if (targetIndex - step >= 0) {
          const img = imagesRef.current[targetIndex - step];
          if (img && img.complete) {
            image = img;
            break;
          }
        }
        if (targetIndex + step < TOTAL_FRAMES) {
          const img = imagesRef.current[targetIndex + step];
          if (img && img.complete) {
            image = img;
            break;
          }
        }
        step++;
      }
    }

    if (!image || !image.complete || image.naturalWidth === 0) return;

    const { width: canvasWidth, height: canvasHeight } = canvasSizeRef.current;
    if (!canvasWidth || !canvasHeight) return;

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

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = frameNumber;
  }, []);

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
     ASSET LOADING PIPELINE (With Concurrency & Async Decode)
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

    // Detect mobile to skip frames (Mobile loads 80 frames, Desktop loads 240)
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const frameStep = isMobile ? 3 : 1; 

    // Generate indices to download
    const indicesToLoad = [];
    for (let i = 0; i < TOTAL_FRAMES; i += frameStep) {
      indicesToLoad.push(i);
    }
    // Always include the last frame to ensure a complete transition
    if (!indicesToLoad.includes(TOTAL_FRAMES - 1)) {
      indicesToLoad.push(TOTAL_FRAMES - 1);
    }

    // Load and asynchronously decode images to prevent scroll freezes
    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const frame = String(index + 1).padStart(3, "0");
        img.src = `/kitchen/ezgif-frame-${frame}.webp`;

        img.onload = () => {
          if (!isMounted) return resolve();
          
          // Force async GPU decoding off the main thread before marking ready
          img.decode()
            .then(() => {
              if (!isMounted) return;
              loadedImages[index] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / indicesToLoad.length) * 100));

              if (index === 0) {
                renderFrame(1);
                setReady(true);
              }
            })
            .catch(() => {
              // Fallback if browser doesn't support/fails decoding
              if (!isMounted) return;
              loadedImages[index] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / indicesToLoad.length) * 100));
            })
            .finally(() => {
              resolve();
            });
        };

        img.onerror = () => {
          if (!isMounted) return resolve();
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / indicesToLoad.length) * 100));
          resolve();
        };
      });
    };

    // Load remaining frames with concurrent workers
    const startLoadingRemaining = async () => {
      // Exclude first index (0) since we load it immediately
      const remainingQueue = indicesToLoad.filter(index => index !== 0);
      const concurrencyLimit = isMobile ? 4 : 6; // Lower queue size on mobile to save CPU

      const worker = async () => {
        while (remainingQueue.length > 0 && isMounted) {
          const nextIndex = remainingQueue.shift();
          if (nextIndex !== undefined) {
            await loadImage(nextIndex);
          }
        }
      };

      const workers = Array.from({ length: concurrencyLimit }, () => worker());
      await Promise.all(workers);
    };

    const initLoad = async () => {
      // Load first frame first so site is interactive
      await loadImage(0);
      
      // Load the rest of the optimized list
      if (isMounted) {
        startLoadingRemaining();
      }
    };

    imagesRef.current = loadedImages;
    initLoad();

    const handleResize = () => {
      updateCanvasDimensions();
      renderFrame(lastDrawnFrameRef.current || 1);
    };

    window.addEventListener("resize", handleResize);

    const unsubscribe = frameIndex.on("change", (latest) => {
      const frame = Math.round(latest);

      if (frame >= TRANSITION_FRAME && !soundTriggeredRef.current) {
        playShutterSound();
        soundTriggeredRef.current = true;
      } else if (frame < TRANSITION_FRAME - 12) {
        soundTriggeredRef.current = false;
      }

      if (frame !== lastDrawnFrameRef.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          renderFrame(frame);
        });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      imagesRef.current = [];
    };
  }, [frameIndex, renderFrame, updateCanvasDimensions]);

  return (
    <section ref={heroRef} className="kitchen-hero" id="home">
      <div className="kitchen-animation">
        <canvas ref={canvasRef} className="kitchen-canvas" />

        {!ready && (
          <div className="kitchen-loading">
            <div className="loading-line" />
            <span style={{ fontSize: "10px", marginTop: "10px", opacity: 0.6 }}>
              {loadProgress}%
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