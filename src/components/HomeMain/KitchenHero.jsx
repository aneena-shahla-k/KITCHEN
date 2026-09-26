import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./kitchenHero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    video.volume = 1;

    // -----------------------------------------
    // PLAY WITH SOUND (FALLBACK TO MUTED IF BLOCKED)
    // -----------------------------------------
    const playHeroVideo = () => {
      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioBlocked(false);
          })
          .catch(() => {
            video.muted = true;
            video.play().catch(() => {});
            setIsAudioBlocked(true);
          });
      }
    };

    // -----------------------------------------
    // STOP VIDEO & SOUND ON LEAVING SECTION
    // -----------------------------------------
    const stopHeroVideo = () => {
      video.pause();
      video.muted = true;
    };

    // -----------------------------------------
    // UNMUTE ON USER INTERACTION
    // -----------------------------------------
    const handleFirstInteraction = () => {
      if (video) {
        video.muted = false;
        video.volume = 1;
        if (video.paused) {
          video.play().catch(() => {});
        }
        setIsAudioBlocked(false);
      }

      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    playHeroVideo();

    // -----------------------------------------
    // SCROLL TRIGGER HANDLERS
    // -----------------------------------------
    const heroTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",

      onEnter: () => {
        playHeroVideo();
      },

      onEnterBack: () => {
        playHeroVideo();
      },

      onLeave: () => {
        stopHeroVideo();
      },

      onLeaveBack: () => {
        stopHeroVideo();
      },
    });

    return () => {
      heroTrigger.kill();
      stopHeroVideo();

      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const handleManualUnmute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
      setIsAudioBlocked(false);
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video"
          src="https://res.cloudinary.com/zu7jndeq/video/upload/v1790345227/hero-vid_zdi5vv.mp4"
          playsInline
          autoPlay
          preload="auto"
          loop={false}
        />

        <div className="hero-overlay" />

        {isAudioBlocked && (
          <button
            type="button"
            className="hero-unmute-btn"
            onClick={handleManualUnmute}
          >
            <span className="unmute-icon">🔊</span>
            <span>Tap for Sound</span>
          </button>
        )}
      </div>
    </section>
  );
}