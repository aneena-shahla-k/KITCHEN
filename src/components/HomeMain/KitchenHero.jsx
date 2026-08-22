import React, { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import "../../styles/HomeStyles/kitchenHero.css";

const TOTAL_FRAMES = 240;

const KitchenHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(-1);

  const [ready, setReady] = useState(false);

  /* ================================
     FRAMER MOTION SCROLL
  ================================ */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [1, TOTAL_FRAMES]
  );

  /* ================================
     DRAW FRAME
  ================================ */

  const drawFrame = (frameNumber) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const imageIndex = Math.max(
        0,
        Math.min(
          TOTAL_FRAMES - 1,
          frameNumber - 1
        )
      );

      const image =
        imagesRef.current[imageIndex];

      if (
        !image ||
        !image.complete ||
        image.naturalWidth === 0
      ) {
        return;
      }

      const context = canvas.getContext(
        "2d",
        {
          alpha: false,
          desynchronized: true,
        }
      );

      if (!context) return;

      const rect =
        canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const pixelWidth =
        Math.round(rect.width * dpr);

      const pixelHeight =
        Math.round(rect.height * dpr);

      if (
        canvas.width !== pixelWidth ||
        canvas.height !== pixelHeight
      ) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      if (
        !canvasWidth ||
        !canvasHeight
      ) {
        return;
      }

      const imageRatio =
        image.naturalWidth /
        image.naturalHeight;

      const canvasRatio =
        canvasWidth /
        canvasHeight;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      /* FULL COVER */

      if (imageRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth =
          drawHeight * imageRatio;

        offsetX =
          (canvasWidth - drawWidth) / 2;

        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight =
          drawWidth / imageRatio;

        offsetX = 0;

        offsetY =
          (canvasHeight - drawHeight) / 2;
      }

      context.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      context.drawImage(
        image,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
    });
  };

  /* ================================
     PRELOAD ALL FRAMES
  ================================ */

  useEffect(() => {
    const loadedImages = [];

    for (
      let i = 1;
      i <= TOTAL_FRAMES;
      i++
    ) {
      const image = new Image();

      image.decoding = "async";

      const frame =
        String(i).padStart(3, "0");

      image.src =
        `/kitchen/ezgif-frame-${frame}.webp`;

      if (i === 1) {
        image.onload = () => {
          requestAnimationFrame(() => {
            drawFrame(1);
            setReady(true);
          });
        };
      }

      loadedImages.push(image);
    }

    imagesRef.current =
      loadedImages;

    const unsubscribe =
      frameIndex.on(
        "change",
        (latest) => {
          const frame =
            Math.round(latest);

          if (
            frame !==
            lastFrameRef.current
          ) {
            lastFrameRef.current =
              frame;

            drawFrame(frame);
          }
        }
      );

    const handleResize = () => {
      drawFrame(
        Math.round(
          frameIndex.get()
        )
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      unsubscribe();

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      imagesRef.current.forEach(
        (image) => {
          if (image) {
            image.onload = null;
            image.onerror = null;
          }
        }
      );

      imagesRef.current = [];
    };
  }, [frameIndex]);

  /* ================================
     RENDER
  ================================ */

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
            <span>
              Years Experience
            </span>
          </div>

          <div>
            <strong>850+</strong>
            <span>
              Projects Completed
            </span>
          </div>

          <div>
            <strong>98%</strong>
            <span>
              Client Satisfaction
            </span>
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