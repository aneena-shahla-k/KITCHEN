import React from "react";
import "./MaterialsHero.css";

import materialsHero from "../../images/material/material-hero.png";

const MaterialsHero = () => {
  return (
    <section
      className="materials-hero"
      style={{
        backgroundImage: `url(${materialsHero})`,
      }}
    >
      <div className="materials-hero-overlay"></div>

      <div className="materials-hero-content">

        {/* Small eyebrow */}
        <div className="materials-hero-eyebrow">
          <span className="materials-eyebrow-line"></span>
          <span>MATERIALS &amp; CRAFTSMANSHIP</span>
        </div>

        {/* Main heading */}
        <h1 className="materials-hero-title">
          Premium Materials,
          <br />
          <em>Thoughtfully Chosen.</em>
        </h1>

        {/* Description */}
        <p className="materials-hero-description">
          Every material tells a story. We select only the finest
          materials to create spaces that are beautiful,
          durable and timeless.
        </p>

        {/* CTA */}
        <a
          href="#materials"
          className="materials-hero-button"
        >
          <span>Explore Materials</span>
          <span className="materials-button-arrow">→</span>
        </a>

      </div>

      {/* Right material navigation */}
      <nav className="materials-hero-nav">

        <a href="#wood" className="active">
          <span>WOOD</span>
        </a>

        <a href="#stone">
          <span>STONE &amp; QUARTZ</span>
        </a>

        <a href="#glass">
          <span>GLASS</span>
        </a>

        <a href="#hardware">
          <span>HARDWARE</span>
        </a>

        <a href="#colours">
          <span>COLOURS</span>
        </a>

      </nav>

      {/* Bottom subtle line */}
      <div className="materials-hero-bottom-line"></div>

    </section>
  );
};

export default MaterialsHero;