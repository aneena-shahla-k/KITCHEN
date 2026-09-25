import React, { useRef, useState } from "react";
import "./BeforeAfter.css";
import img1 from "../../images/charcoal-old.png";
import img11 from "../../images/charcoal-new.png";
import img2 from "../../images/custom-old.png";
import img22 from "../../images/custom-new.png";
import img3 from "../../images/white-old.png";
import img33 from "../../images/white-new.png";
import img4 from "../../images/waln-old.png";
import img44 from "../../images/walnut-new.png";


const projects = [
  {
    id: "01",
    title: "Contemporary Family Kitchen",
    style: "Modern",
    materials: "Laminate + Quartz",
    storage: "Tall Unit + Pantry + Soft-Close Drawers",

    before: img1,
    after: img11,
  },
  {
    id: "02",
    title: "Urban Minimal Kitchen",
    style: "Minimal",
    materials: "Matte Finish + Quartz",
    storage: "Tall Unit + Pull-Outs + Soft-Close Drawers",

    before: img2,
    after: img22,
  },
  {
    id: "03",
    title: "Elegant Urban Kitchen",
    style: "Contemporary",
    materials: "Matte Finish + Quartz",
    storage: "Pantry + Pull-Outs + Soft-Close Drawers",

    before: img3,
    after: img33,
  },
  {
    id: "04",
    title: "Scandinavian Kitchen",
    style: "Scandinavian",
    materials: "Oak Finish + Quartz",
    storage: "Open Shelves + Pantry + Deep Drawers",

    before: img4,
    after: img44,
  },
  
];

export default function BeforeAfter() {
  const [activeProject, setActiveProject] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const project = projects[activeProject];

  const updateSlider = (clientX) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    let position = ((clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    setSliderPosition(position);
  };

  const handlePointerDown = (e) => {
    dragging.current = true;

    e.currentTarget.setPointerCapture?.(e.pointerId);

    updateSlider(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const selectProject = (index) => {
    setActiveProject(index);
    setSliderPosition(50);
  };

  return (
    <section className="ba-section">
      <div className="ba-container">

        {/* Decorative leaves */}
        <div className="ba-decoration">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* HEADER */}
        <div className="ba-header">

          <div className="ba-heading-area">
            <div className="ba-section-label">
              <span className="ba-label-line"></span>
              <span>BEFORE &amp; AFTER</span>
            </div>

            <h2 className="ba-title">
              Real Kitchens.
              <br />
              Real Transformations.
            </h2>

            <p className="ba-intro">
              See how we turn ordinary spaces into extraordinary kitchens —
              <br className="ba-desktop-break" />
              with smart design, premium materials and expert craftsmanship.
            </p>
          </div>

          <div className="ba-header-note">
            <div className="ba-note-text">
              Same Space.
              <br />
              A Whole New Story.
            </div>
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="ba-main-grid">

          {/* SLIDER */}
          <div
            className="ba-slider"
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={(e) => {
              if (e.buttons === 0) {
                dragging.current = false;
              }
            }}
          >

            {/* AFTER IMAGE - BACKGROUND */}
            <img
              src={project.after}
              alt={`${project.title} after renovation`}
              className="ba-image ba-after-image"
              draggable="false"
            />

            {/* BEFORE IMAGE */}
            <div
              className="ba-before-wrapper"
              style={{
                width: `${sliderPosition}%`,
              }}
            >
              <img
                src={project.before}
                alt={`${project.title} before renovation`}
                className="ba-image ba-before-image"
                draggable="false"
              />
            </div>

            {/* BEFORE LABEL */}
            <div className="ba-image-label ba-before-label">
              BEFORE
            </div>

            {/* AFTER LABEL */}
            <div className="ba-image-label ba-after-label">
              AFTER
            </div>

            {/* DIVIDER */}
            <div
              className="ba-divider"
              style={{
                left: `${sliderPosition}%`,
              }}
            >
              <div className="ba-drag-handle">
                <span>‹</span>
                <span>›</span>
              </div>
            </div>

          </div>

          {/* PROJECT DETAILS */}
          <aside className="ba-project-info">

            <div className="ba-project-number">
              PROJECT {project.id}
            </div>

            <h3 className="ba-project-title">
              {project.title}
            </h3>

            <div className="ba-info-list">

              <div className="ba-info-row">

                <div className="ba-info-icon">
                  <span className="ba-icon-tag"></span>
                </div>

                <div>
                  <div className="ba-info-label">
                    Style
                  </div>

                  <div className="ba-info-value">
                    {project.style}
                  </div>
                </div>

              </div>

              <div className="ba-info-row">

                <div className="ba-info-icon">
                  <span className="ba-icon-layers"></span>
                </div>

                <div>
                  <div className="ba-info-label">
                    Materials
                  </div>

                  <div className="ba-info-value">
                    {project.materials}
                  </div>
                </div>

              </div>

              <div className="ba-info-row">

                <div className="ba-info-icon">
                  <span className="ba-icon-storage"></span>
                </div>

                <div>
                  <div className="ba-info-label">
                    Storage
                  </div>

                  <div className="ba-info-value">
                    {project.storage}
                  </div>
                </div>

              </div>

            </div>

            <div className="ba-cta-wrapper">

              <button
                className="ba-cta"
                type="button"
              >
                <span>View More Transformations</span>

                <span className="ba-cta-arrow">
                  →
                </span>
              </button>

            </div>

          </aside>

        </div>

        {/* PROJECT THUMBNAILS */}
        <div className="ba-project-selector">

          <button
            className="ba-nav-arrow"
            type="button"
            onClick={() =>
              setActiveProject(
                activeProject === 0
                  ? projects.length - 1
                  : activeProject - 1
              )
            }
            aria-label="Previous project"
          >
            ‹
          </button>

          <div className="ba-thumbnails">

            {projects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`ba-thumbnail ${
                  activeProject === index
                    ? "is-active"
                    : ""
                }`}
                onClick={() => selectProject(index)}
              >

                <div className="ba-thumbnail-image">

                  <img
                    src={item.after}
                    alt={item.title}
                    draggable="false"
                  />

                  <div className="ba-thumbnail-divider"></div>

                  <div className="ba-thumbnail-handle">
                    ‹›
                  </div>

                </div>

                <div className="ba-thumbnail-title">
                  Project {item.id} — {item.title}
                </div>

              </button>
            ))}

          </div>

          <button
            className="ba-nav-arrow"
            type="button"
            onClick={() =>
              setActiveProject(
                activeProject === projects.length - 1
                  ? 0
                  : activeProject + 1
              )
            }
            aria-label="Next project"
          >
            ›
          </button>

        </div>

      </div>
    </section>
  );
}