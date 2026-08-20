import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/HomeStyles/projectGallery.css";

import project1 from "../../images/modern.jpg";
import project2 from "../../images/modernn.jpg";
import project3 from "../../images/minimal.jpg";
import project4 from "../../images/wood.jpg";
import project5 from "../../images/luxury.jpg";
import project6 from "../../images/classic.jpg";
import project7 from "../../images/kitchen.jpg";

const projects = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7
];

const ProjectGallery = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const previous = () => {
    setActive((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  return (
    <section className="project-gallery">

      <div className="project-gallery-track">

        {projects.map((image, index) => (
          <div
            key={index}
            className={`project-gallery-card ${
              index === active ? "active" : ""
            }`}
            style={{
              transform: `translateX(calc(-50% + ${
                (index - active) * 245
              }px))`
            }}
          >
            <img
              src={image}
              alt={`Kitchen project ${index + 1}`}
            />
          </div>
        ))}

      </div>

      <button
        className="project-gallery-arrow left"
        onClick={previous}
        aria-label="Previous project"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button
        className="project-gallery-arrow right"
        onClick={next}
        aria-label="Next project"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

    </section>
  );
};

export default ProjectGallery;