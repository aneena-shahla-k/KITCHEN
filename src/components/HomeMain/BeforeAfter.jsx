import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers3,
  Home,
} from "lucide-react";

import "./BeforeAfter.css";

// Replace these with your actual BEFORE / AFTER images
import kitchenBefore from "../../images/custom-old.png";
import kitchenAfter from "../../images/custom-new.png";

const projects = [
  {
    title: "Kitchen Redesign",
    category: "Residential Kitchen",
    before: kitchenBefore,
    after: kitchenAfter,
    description: "Modern · Functional · Elegant",
  },

  // Add more projects here
  // {
  //   title: "Living Space",
  //   category: "Interior Transformation",
  //   before: livingBefore,
  //   after: livingAfter,
  //   description: "Warm · Minimal · Contemporary",
  // },
];

const features = [
  {
    icon: Sparkles,
    title: "Modern Aesthetics",
    text: "Timeless designs that elevate your everyday life.",
  },
  {
    icon: Layers3,
    title: "Premium Materials",
    text: "Quality finishes designed for lasting beauty.",
  },
  {
    icon: Home,
    title: "Smart Functionality",
    text: "Beautiful spaces that work around your lifestyle.",
  },
];

export default function BeforeAfter({ onExplore }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const project = projects[projectIndex];

  const updateSlider = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let position = ((clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    setSliderPosition(position);
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;

    e.currentTarget.setPointerCapture?.(e.pointerId);

    updateSlider(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;

    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const nextProject = () => {
    setProjectIndex((current) => {
      return current === projects.length - 1 ? 0 : current + 1;
    });

    setSliderPosition(50);
  };

  const previousProject = () => {
    setProjectIndex((current) => {
      return current === 0 ? projects.length - 1 : current - 1;
    });

    setSliderPosition(50);
  };

  return (
    <section className="before-after-section">
      <div className="before-after-orb before-after-orb-one" />
      <div className="before-after-orb before-after-orb-two" />

      <div className="before-after-container">

        {/* LEFT CONTENT */}
        <motion.div
          className="before-after-content"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-eyebrow">
            <span />
            OUR TRANSFORMATION
          </div>

          <h2>
            From Vision
            <br />
          <em>to living</em>
          </h2>

          <p className="section-description">
            See how we transform spaces with thoughtful design,
            premium materials and intelligent planning.
          </p>

          <div className="transformation-features">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  className="transformation-feature"
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.1,
                  }}
                >
                  <div className="feature-icon">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            className="explore-projects-btn"
            onClick={onExplore}
          >
            <span>EXPLORE MORE PROJECTS</span>
            <ArrowUpRight size={17} />
          </button>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          className="before-after-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >

          <div
            ref={containerRef}
            className="comparison-wrapper"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >

            {/* AFTER IMAGE */}
            <div className="comparison-after">
              <img
                src={project.after}
                alt={`${project.title} after`}
                draggable="false"
              />

              <div className="comparison-label after-label">
                AFTER
              </div>
            </div>

            {/* BEFORE IMAGE */}
            <div
              className="comparison-before"
              style={{
                width: `${sliderPosition}%`,
              }}
            >
              <div className="before-image-inner">
                <img
                  src={project.before}
                  alt={`${project.title} before`}
                  draggable="false"
                />
              </div>

              <div className="comparison-label before-label">
                BEFORE
              </div>
            </div>

            {/* SLIDER LINE */}
            <div
              className="comparison-line"
              style={{
                left: `${sliderPosition}%`,
              }}
            >
              <button
                className="comparison-handle"
                onPointerDown={handlePointerDown}
                aria-label="Drag to compare before and after"
              >
                <ArrowLeft size={16} />
                <ArrowRight size={16} />
              </button>
            </div>

            {/* BOTTOM PROJECT CARD */}
            <div className="project-info-card">

              <div className="project-thumbnail">
                <img
                  src={project.before}
                  alt=""
                />
              </div>

              <div className="project-info-text">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

            </div>
          </div>

          {/* PROJECT NAVIGATION */}
          <div className="comparison-bottom">

            <div className="project-counter">
              <strong>
                {String(projectIndex + 1).padStart(2, "0")}
              </strong>

              <span>/</span>

              <span>
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="comparison-navigation">

              <button
                onClick={previousProject}
                aria-label="Previous project"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                onClick={nextProject}
                aria-label="Next project"
              >
                <ArrowRight size={17} />
              </button>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}