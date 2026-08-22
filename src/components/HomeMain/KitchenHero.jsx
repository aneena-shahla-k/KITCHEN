import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import "../../styles/HomeStyles/kitchenHero.css";

const TOTAL_FRAMES = 240;
const INITIAL_FRAMES = 8;
const PRELOAD_AHEAD = 24;
const KEEP_BEHIND = 12;

const getFramePath = (index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/kitchen/ezgif-frame-${frame}.webp`;
};

const KitchenHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef(new Map());
  const loadingRef = useRef(new Set());
  const loadedRef = useRef(new Set());

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  const animationFrameRef = useRef(null);
  const preloadTimerRef = useRef(null);
  const resizeTimerRef = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;

    if (!hero || !canvas) return undefined;

    const images = imagesRef.current;
    const loading = loadingRef.current;
    const loaded = loadedRef.current;

    /* =========================================
       DRAW FRAME (COVER ALL SCREENS PROPERLY)
    ========================================= */
    const drawFrame = (frameIndex) => {
      const image = images.get(frameIndex);
      if (!image || !image.complete) return;

      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width || window.innerWidth;
      const displayHeight = rect.height || window.innerHeight;

      if (!displayWidth || !displayHeight) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(displayWidth * dpr));
      const pixelHeight = Math.max(1, Math.round(displayHeight * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });

      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      // Full bleed cover (desktop and mobile)
      if (imageRatio > canvasRatio) {
        drawHeight = displayHeight;
        drawWidth = drawHeight * imageRatio;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = displayWidth;
        drawHeight = drawWidth / imageRatio;
        offsetX = 0;
        offsetY = (displayHeight - drawHeight) / 2;
      }

      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    /* =========================================
       LOAD FRAME
    ========================================= */
    const loadFrame = (index) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (loaded.has(index) || loading.has(index)) return;

      loading.add(index);
      const image = new Image();
      image.decoding = "async";

      image.onload = async () => {
        try {
          if (image.decode) {
            await image.decode();
          }
        } catch (error) {
          // Fallback
        }

        images.set(index, image);
        loaded.add(index);
        loading.delete(index);

        if (index === 0) {
          setReady(true);
          requestAnimationFrame(() => {
            drawFrame(0);
          });
        }
      };

      image.onerror = () => {
        loading.delete(index);
      };

      image.src = getFramePath(index);
    };

    /* =========================================
       PRELOAD RANGE
    ========================================= */
    const preloadRange = (start, end) => {
      const safeStart = Math.max(0, Math.floor(start));
      const safeEnd = Math.min(TOTAL_FRAMES - 1, Math.ceil(end));

      for (let i = safeStart; i <= safeEnd; i++) {
        loadFrame(i);
      }
    };

    /* =========================================
       CLEANUP FRAMES
    ========================================= */
    const cleanupFarFrames = (current) => {
      const minFrame = Math.max(0, current - KEEP_BEHIND);
      const maxFrame = Math.min(TOTAL_FRAMES - 1, current + PRELOAD_AHEAD);

      images.forEach((image, index) => {
        if (index !== 0 && index < minFrame) {
          image.onload = null;
          image.onerror = null;
          images.delete(index);
          loaded.delete(index);
        }

        if (index > maxFrame) {
          image.onload = null;
          image.onerror = null;
          images.delete(index);
          loaded.delete(index);
        }
      });
    };

    /* =========================================
       ANIMATION LOOP
    ========================================= */
    const updateAnimation = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;

      if (Math.abs(target - current) > 0.01) {
        const difference = target - current;
        currentFrameRef.current =
          Math.abs(difference) < 0.5 ? target : current + difference * 0.18;

        const frame = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
        );

        const image = images.get(frame);

        if (image) {
          drawFrame(frame);
        } else {
          preloadRange(frame, frame + PRELOAD_AHEAD);
        }

        preloadRange(frame, frame + PRELOAD_AHEAD);

        if (frame > 0) {
          preloadRange(frame - 4, frame);
        }

        cleanupFarFrames(frame);
      }

      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    /* =========================================
       SCROLL
    ========================================= */
    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDistance = Math.max(1, hero.offsetHeight - viewportHeight);
      const passed = Math.min(Math.max(-rect.top, 0), totalDistance);
      const progress = passed / totalDistance;

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      if (!preloadTimerRef.current) {
        preloadTimerRef.current = setTimeout(() => {
          const target = Math.round(targetFrameRef.current);
          preloadRange(
            Math.max(0, target - 4),
            Math.min(TOTAL_FRAMES - 1, target + PRELOAD_AHEAD)
          );
          preloadTimerRef.current = null;
        }, 50);
      }
    };

    /* =========================================
       RESIZE
    ========================================= */
    const handleResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        const current = Math.round(currentFrameRef.current);
        drawFrame(current);
      }, 50);
    };

    /* =========================================
       INTERSECTION OBSERVER
    ========================================= */
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(updateAnimation);
          }
        } else {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }
      },
      {
        threshold: 0,
        rootMargin: "300px 0px",
      }
    );

    preloadRange(0, INITIAL_FRAMES - 1);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    observer.observe(hero);

    handleScroll();
    animationFrameRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      clearTimeout(preloadTimerRef.current);
      clearTimeout(resizeTimerRef.current);

      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });

      images.clear();
      loaded.clear();
      loading.clear();
    };
  }, []);

  return (
    <section ref={heroRef} className="kitchen-hero" id="home">
      <div className="kitchen-animation">
        <canvas ref={canvasRef} className="kitchen-canvas" />

        {!ready && (
          <div className="kitchen-loading">
            <div className="loading-line" />
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