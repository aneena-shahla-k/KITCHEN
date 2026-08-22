import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import "../../styles/HomeStyles/kitchenHero.css";

const TOTAL_FRAMES = 240;
const INITIAL_FRAMES = 12;

const getFramePath = (index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/kitchen/ezgif-frame-${frame}.webp`;
};

const KitchenHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const animationFrameRef = useRef(null);
  const loadedCountRef = useRef(0);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;

    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!ctx) return;

    /* ================================
       CANVAS SIZE
    ================================ */

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawFrame(Math.round(currentFrameRef.current));
    };

    /* ================================
       DRAW FRAME
    ================================ */

    const drawFrame = (frameIndex) => {
      const image = imagesRef.current[frameIndex];

      if (!image || !image.complete) return false;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return false;

      ctx.clearRect(0, 0, width, height);

      const imageRatio =
        image.naturalWidth / image.naturalHeight;

      const screenRatio =
        width / height;

      let drawWidth;
      let drawHeight;
      let x;
      let y;

      // Desktop + mobile full cover
      if (imageRatio > screenRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
        x = (width - drawWidth) / 2;
        y = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
        x = 0;
        y = (height - drawHeight) / 2;
      }

      ctx.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
      );

      return true;
    };

    /* ================================
       LOAD ONE FRAME
    ================================ */

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          resolve();
          return;
        }

        const image = new Image();

        image.decoding = "async";
        image.fetchPriority =
          index < INITIAL_FRAMES
            ? "high"
            : "auto";

        image.onload = () => {
          imagesRef.current[index] = image;
          loadedCountRef.current += 1;

          if (index === 0) {
            setReady(true);

            requestAnimationFrame(() => {
              drawFrame(0);
            });
          }

          resolve();
        };

        image.onerror = () => {
          resolve();
        };

        image.src = getFramePath(index);
      });
    };

    /* ================================
       PRIORITY PRELOAD

       Load first frames immediately.
       Then load all remaining frames.
    ================================ */

    const preloadFrames = async () => {
      // First visible frames
      const initialPromises = [];

      for (
        let i = 0;
        i < Math.min(INITIAL_FRAMES, TOTAL_FRAMES);
        i++
      ) {
        initialPromises.push(loadFrame(i));
      }

      await Promise.all(initialPromises);

      // Load rest progressively
      for (
        let i = INITIAL_FRAMES;
        i < TOTAL_FRAMES;
        i += 6
      ) {
        const batch = [];

        for (
          let j = i;
          j < Math.min(i + 6, TOTAL_FRAMES);
          j++
        ) {
          batch.push(loadFrame(j));
        }

        await Promise.all(batch);

        // Give browser breathing room
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });
      }
    };

    /* ================================
       FIND NEAREST AVAILABLE FRAME

       If target isn't loaded yet,
       show closest available frame.
    ================================ */

    const getAvailableFrame = (frame) => {
      if (imagesRef.current[frame]) return frame;

      for (let distance = 1; distance < TOTAL_FRAMES; distance++) {
        const previous = frame - distance;
        const next = frame + distance;

        if (
          previous >= 0 &&
          imagesRef.current[previous]
        ) {
          return previous;
        }

        if (
          next < TOTAL_FRAMES &&
          imagesRef.current[next]
        ) {
          return next;
        }
      }

      return 0;
    };

    /* ================================
       SMOOTH RENDER LOOP
    ================================ */

    const render = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Slight cinematic smoothing
      const nextCurrent =
        current + (target - current) * 0.28;

      currentFrameRef.current =
        Math.abs(target - nextCurrent) < 0.01
          ? target
          : nextCurrent;

      const requestedFrame = Math.round(
        currentFrameRef.current
      );

      const availableFrame =
        getAvailableFrame(requestedFrame);

      drawFrame(availableFrame);

      animationFrameRef.current =
        requestAnimationFrame(render);
    };

    /* ================================
       SCROLL → FRAME
    ================================ */

    const updateScrollProgress = () => {
      const rect =
        hero.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const scrollDistance =
        hero.offsetHeight -
        viewportHeight;

      const passed = Math.min(
        Math.max(-rect.top, 0),
        Math.max(scrollDistance, 1)
      );

      const progress =
        passed /
        Math.max(scrollDistance, 1);

      targetFrameRef.current =
        progress * (TOTAL_FRAMES - 1);
    };

    /* ================================
       EVENTS
    ================================ */

    window.addEventListener(
      "scroll",
      updateScrollProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    resizeCanvas();
    updateScrollProgress();

    animationFrameRef.current =
      requestAnimationFrame(render);

    preloadFrames();

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollProgress
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      imagesRef.current.forEach((image) => {
        if (image) {
          image.onload = null;
          image.onerror = null;
        }
      });

      imagesRef.current = [];
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="kitchen-hero"
      id="home"
    >
      <div className="kitchen-animation">

        <canvas
          ref={canvasRef}
          className="kitchen-canvas"
        />

        {!ready && (
          <div className="kitchen-loading">
            <div className="loading-line" />
          </div>
        )}

        <div className="kitchen-overlay" />

        <div className="kitchen-hero-content">
          <span className="kitchen-eyebrow">
            DESIGN · CREATE · INSPIRE
          </span>

          <h1>
            Designing
            <br />
            Your Space.
          </h1>

          <p>
            Custom kitchens crafted around
            your lifestyle.
          </p>

          <div className="kitchen-actions">
            <a
              href="#styles"
              className="kitchen-primary"
            >
              Explore Kitchens
              <ArrowRight size={16} />
            </a>

            <button
              className="kitchen-showreel"
              type="button"
            >
              <span className="kitchen-play">
                <Play
                  size={12}
                  fill="currentColor"
                />
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