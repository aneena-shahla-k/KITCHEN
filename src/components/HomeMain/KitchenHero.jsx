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
  ================================ */
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
     OPTIMIZED DRAW FUNCTION
  ================================ */
  const renderFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const imageIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameNumber - 1));
    const image = imagesRef.current[imageIndex];

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
     ASSET LOADING PIPELINE
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

    // Helper to load a single image and resolve when loaded/failed
    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const frame = String(index + 1).padStart(3, "0");
        img.src = `/kitchen/ezgif-frame-${frame}.webp`;

        img.onload = () => {
          if (!isMounted) return resolve();
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

          if (index === 0) {
            renderFrame(1);
            setReady(true);
          }
          resolve();
        };

        img.onerror = () => {
          if (!isMounted) return resolve();
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };

        loadedImages[index] = img;
      });
    };

    // Load remaining frames with standard concurrency limit (6 parallel workers)
    const startLoadingRemaining = async () => {
      const remainingIndices = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1);
      const concurrencyLimit = 6;

      const worker = async () => {
        while (remainingIndices.length > 0 && isMounted) {
          const nextIndex = remainingIndices.shift();
          if (nextIndex !== undefined) {
            await loadImage(nextIndex);
          }
        }
      };

      // Launch parallel worker loops
      const workers = Array.from({ length: concurrencyLimit }, () => worker());
      await Promise.all(workers);
    };

    // Initialize loading flow
    const initLoad = async () => {
      // 1. Prioritize frame 001 first for instant interactivity
      await loadImage(0);
      
      // 2. Start preloading the remaining 239 frames in background
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