import React, { useState } from "react";
import "./FinalVideoCTA.css";

const FinalVideoCTA = ({ videoSrc }) => {
  const [showCTA, setShowCTA] = useState(false);

  return (
    <section className={`final-video-section ${showCTA ? "show-cta" : ""}`}>

      {/* EXISTING VIDEO */}
      <video
        className="final-video"
        src="https://res.cloudinary.com/zu7jndeq/video/upload/v1790345166/Kitchen_transformation_video_cre_E2_80_A6_1080p_20260924171137-ezremove_usaiz1.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setShowCTA(true)}
      />

      {/* VIDEO OVERLAY */}
      <div className="final-video-dark"></div>

      {/* CTA */}
      <div className="final-video-content">

        <span className="final-video-label">
          LET'S CREATE YOUR SPACE
        </span>

        <h2>
          Your Kitchen Is Already Here.
          <br />
          <em>Let's Redesign It.</em>
        </h2>

        <p>
          Upload a photo of your existing kitchen and start exploring
          what's possible.
        </p>

        <button className="final-video-button">
          Upload My Kitchen Photo
          <span>→</span>
        </button>

        <div className="final-video-features">
          <span>Free Design Consultation</span>
          <span>Custom Kitchen Solutions</span>
          <span>Transparent Estimates</span>
        </div>

      </div>

    </section>
  );
};

export default FinalVideoCTA;