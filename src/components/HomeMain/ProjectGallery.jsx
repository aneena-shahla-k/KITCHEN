import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/HomeStyles/projectGallery.css";

import project1 from "../../images/minimal.jpg";
import project2 from "../../images/modern.jpg";
import project3 from "../../images/modernn.jpg";
import project4 from "../../images/classic.jpg";
import project5 from "../../images/wood.jpg";
import project6 from "../../images/luxury.jpg";

const projects = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project3,
  project4,
  project5,
  project6,
];

const ProjectGallery = () => {
  const [active, setActive] = useState(2);

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

        {projects.map((image, index) => {

          let offset = index - active;

          if (offset > projects.length / 2) {
            offset -= projects.length;
          }

          if (offset < -projects.length / 2) {
            offset += projects.length;
          }

          return (
            <div
              key={index}
              className={`project-card ${
                offset === 0 ? "project-card-active" : ""
              }`}
              style={{
                "--offset": offset
              }}
              onClick={() => setActive(index)}
            >
              <img
                src={image}
                alt={`Kitchen project ${index + 1}`}
              />
            </div>
          );
        })}

      </div>

      <button
        className="project-gallery-button project-gallery-prev"
        onClick={previous}
        aria-label="Previous"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </button>

      <button
        className="project-gallery-button project-gallery-next"
        onClick={next}
        aria-label="Next"
      >
        <ChevronRight size={22} strokeWidth={1.5} />
      </button>

    </section>
  );
};

export default ProjectGallery;