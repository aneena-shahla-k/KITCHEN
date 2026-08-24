import React, { useState, useRef, useCallback } from "react";
import { Sparkles, CheckCircle2, Layers } from "lucide-react";
import "./BlueprintToReality.css";

// Replace these imports with your actual project 3D renders and real site photos
import render1 from "../../images/projects/before.png";
import real1 from "../../images/projects/after.png";

import render2 from "../../images/projects/before.png";
import real2 from "../../images/projects/IMG_8265.jpg";

import render3 from "../../images/projects/before.png";
import real3 from "../../images/projects/IMG_8270.jpg";

const caseStudies = [
  {
    id: "calicut-villa",
    title: "The Kottooli Residence",
    location: "Calicut, Kerala",
    accuracy: "99.2%",
    renderImage: render1,
    realImage: real1,
    specs: {
      layout: "L-Shaped with Breakfast Ledge",
      finish: "Matte Sage PU & Natural Teak",
      timeline: "4.5 Weeks",
    },
    highlights: [
      "Exact wood grain alignment matched to 3D approval",
      "Seamless under-cabinet warm profile lighting",
      "Fluted glass wall cabinets executed without visible screws",
    ],
  },
  {
    id: "kochi-penthouse",
    title: "Marine Drive Penthouse",
    location: "Kochi, Kerala",
    accuracy: "98.8%",
    renderImage: render2,
    realImage: real2,
    specs: {
      layout: "Parallel Island Concept",
      finish: "High Gloss Ultra Acrylic",
      timeline: "5 Weeks",
    },
    highlights: [
      "Zero-tolerance integrated appliance fit",
      "Exact countertop waterfall vein matching",
      "Concealed finger-pull profile handles",
    ],
  },
  {
    id: "kannur-home",
    title: "Payyambalam Coastal Villa",
    location: "Kannur, Kerala",
    accuracy: "99.5%",
    renderImage: render3,
    realImage: real3,
    specs: {
      layout: "U-Shaped Modular",
      finish: "Anti-Fingerprint Super Matte",
      timeline: "3.5 Weeks",
    },
    highlights: [
      "Moisture-proof marine core cabinetry",
      "Pantry tall unit with internal sensor lights",
      "Heavy-duty soft close drawer channels",
    ],
  },
];

const BlueprintToReality = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const current = caseStudies[activeProject];

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="blueprint-section">
      <div className="blueprint-container">
        {/* HEADER */}
        <div className="blueprint-header">
          <div>
            <span className="blueprint-label">
              <Sparkles size={13} />
              EXECUTION INTEGRITY
            </span>
            <h2>
              From 3D Blueprint
              <br />
              <span>to living reality.</span>
            </h2>
          </div>
          <p>
            What you approve in design is what gets built in your home. Drag the
            slider to compare the approved 3D concept against the final
            photographed kitchen.
          </p>
        </div>

        {/* PROJECT TAB SELECTOR */}
        <div className="blueprint-tabs">
          {caseStudies.map((study, idx) => (
            <button
              key={study.id}
              type="button"
              className={`blueprint-tab ${
                activeProject === idx ? "active" : ""
              }`}
              onClick={() => {
                setActiveProject(idx);
                setSliderPosition(50);
              }}
            >
              <span className="tab-number">0{idx + 1}</span>
              <span className="tab-title">{study.title}</span>
            </button>
          ))}
        </div>

        {/* MAIN INTERACTIVE SPLIT STAGE */}
        <div className="blueprint-stage">
          {/* SLIDER COMPARISON VIEW */}
          <div
            ref={containerRef}
            className="blueprint-compare"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* REAL FINISHED PHOTO (BACKGROUND) */}
            <img
              src={current.realImage}
              alt="Real finished kitchen"
              className="compare-image compare-real"
            />
            <span className="compare-badge badge-real">REAL OUTCOME</span>

            {/* 3D RENDER (FOREGROUND CLIPPED) */}
            <div
              className="compare-clipped-layer"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={current.renderImage}
                alt="3D Approved Blueprint"
                className="compare-image compare-render"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100%",
                }}
              />
              <span className="compare-badge badge-render">3D BLUEPRINT</span>
            </div>

            {/* DRAGGABLE DIVIDER LINE */}
            <div
              className="compare-divider"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="divider-handle">
                <Layers size={14} />
              </div>
            </div>
          </div>

          {/* SIDE DATA & VERIFICATION CARD */}
          <div className="blueprint-data-card">
            <div className="data-top">
              <span className="data-eyebrow">VERIFIED OUTCOME</span>
              <h3>{current.title}</h3>
              <small>{current.location}</small>
            </div>

            <div className="accuracy-box">
              <div className="accuracy-score">
                <strong>{current.accuracy}</strong>
                <span>Design Match Accuracy</span>
              </div>
            </div>

            <div className="specs-grid">
              <div>
                <span>Layout</span>
                <strong>{current.specs.layout}</strong>
              </div>
              <div>
                <span>Finish</span>
                <strong>{current.specs.finish}</strong>
              </div>
              <div>
                <span>Build Time</span>
                <strong>{current.specs.timeline}</strong>
              </div>
            </div>

            <div className="highlights-list">
              <span>KEY EXECUTION HIGHLIGHTS</span>
              <ul>
                {current.highlights.map((point, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} />
                    <p>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintToReality;