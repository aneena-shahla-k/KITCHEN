import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProjectShowcase.css";

import img1 from "../../images/projects/IMG_8271.jpg";
import img2 from "../../images/projects/IMG_8265.jpg";
import img3 from "../../images/projects/IMG_8270.jpg";
import img4 from "../../images/projects/IMG_8268.jpg";
import img5 from "../../images/projects/IMG_8260.jpg";

const projectShowcase = [
  {
    id: 1,
    title: "Calicut Residence",
    location: "Calicut, Kerala",
    image: img1,
  },
  {
    id: 2,
    title: "Modern Haven",
    location: "Kozhikode, Kerala",
    image: img2,
  },
  {
    id: 3,
    title: "Warm Minimal",
    location: "Kannur, Kerala",
    image: img3,
  },
  {
    id: 4,
    title: "Contemporary Villa",
    location: "Kochi, Kerala",
    image: img4,
  },
  {
    id: 5,
    title: "Elegant Oak",
    location: "Calicut, Kerala",
    image: img5,
  },
];

const ProjectShowcase = () => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (!sliderRef.current) return;
    const amount = 320;
    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="project-showcase">
      {/* LEFT CONTENT */}
      <div className="project-showcase-content">
        <span className="project-showcase-eyebrow">OUR WORK</span>

        <h2>
          Kitchens we're
          <br />
          <span>proud of.</span>
        </h2>

        <p>
          Real spaces crafted with durable materials, practical layouts, and
          attention to detail.
        </p>

        <Link to="/kitchens" className="project-showcase-link">
          <span>View all projects</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* RIGHT SLIDER */}
      <div className="project-showcase-slider-wrapper">
        <div className="project-showcase-slider" ref={sliderRef}>
          {projectShowcase.map((project) => (
            <Link
              to={`/kitchens?project=${project.id}`}
              className="project-showcase-card"
              key={project.id}
            >
              <div className="project-showcase-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-showcase-card-overlay">
                  <span>{project.location}</span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="project-showcase-controls">
          <button
            type="button"
            onClick={() => slide("prev")}
            aria-label="Previous projects"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => slide("next")}
            aria-label="Next projects"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;