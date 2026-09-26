import React from "react";
import "./MaterialCta.css";

import ctaImage from "../../images/material/material-cta.png";

const MaterialCta = () => {
  return (
    <section className="material-cta">

      {/* Background image */}
      <img
        src={ctaImage}
        alt="Premium kitchen interior"
        className="material-cta-image"
      />

      {/* Dark cinematic overlay */}
      <div className="material-cta-overlay"></div>

      {/* Content */}
      <div className="material-cta-content">

        <span className="material-cta-eyebrow">
          READY TO BRING IT TO LIFE
        </span>

        <h2>
          Your Dream Kitchen
          <br />
          <em>Starts Here</em>
        </h2>

        <p>
          Get expert guidance and personalised
          recommendations for your space.
        </p>

        <a
          href="/contact"
          className="material-cta-button"
        >
          <span>Talk to a Designer</span>

          <span className="material-cta-arrow">
            →
          </span>
        </a>

      </div>

    </section>
  );
};

export default MaterialCta;