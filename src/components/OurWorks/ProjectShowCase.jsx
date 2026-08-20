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
    location: "Calicut",
    image: img1,
  },
  {
    id: 2,
    title: "Modern Haven",
    location: "Kozhikode",
    image: img2,
  },
  {
    id: 3,
    title: "Warm Minimal",
    location: "Kannur",
    image: img3,
  },
  {
    id: 4,
    title: "Contemporary Villa",
    location: "Kochi",
    image: img4,
  },
  {
    id: 5,
    title: "Elegant Oak",
    location: "Calicut",
    image: img5,
  },
];

const ProjectShowcase = () => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (!sliderRef.current) return;

    const amount = 330;

    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="project-showcase">

      {/* LEFT CONTENT */}
      <div className="project-showcase-content">
        <h2>
          Kitchens We're
          <br />
          <em>Proud Of</em>
        </h2>

        <Link
          to="/our-work"
          className="project-showcase-link"
        >
          <span>View All Projects</span>
          <ArrowRight size={14} />
        </Link>

      </div>


      {/* RIGHT SLIDER */}
      <div className="project-showcase-slider-wrapper">

        <div
          className="project-showcase-slider"
          ref={sliderRef}
        >
          {projectShowcase.map((project) => (
            <Link
              to={`/our-work/${project.id}`}
              className="project-showcase-card"
              key={project.id}
            >
              <div className="project-showcase-image">
                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-showcase-card-overlay">
                  <span>{project.location}</span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>


        {/* SLIDER CONTROLS */}
        <div className="project-showcase-controls">

          <button
            type="button"
            onClick={() => slide("prev")}
            aria-label="Previous projects"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={() => slide("next")}
            aria-label="Next projects"
          >
            <ChevronRight size={17} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default ProjectShowcase;