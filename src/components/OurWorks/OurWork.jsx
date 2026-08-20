import React, { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./OurWork.css";

import project1 from "../../images/projects/IMG_8268.jpg";
import project2 from "../../images/projects/IMG_8260.jpg";
import project3 from "../../images/projects/IMG_8262.jpg";
import project4 from "../../images/projects/IMG_8269.jpg";
import after from "../../images/projects/before.png";
import before from "../../images/projects/after.png";
import img1 from "../../images/projects/IMG_8271.jpg";

const projects = [
  {
    id: 1,
    number: "01",
    title: "The Warm Kitchen",
    location: "Kochi, Kerala",
    category: "MODERN",
    year: "2026",
    description:
      "A warm contemporary kitchen built around natural textures, soft lighting and everyday functionality.",
    image: project1,
    featured: true,
  },
  {
    id: 2,
    number: "02",
    title: "The Stone Residence",
    location: "Thrissur, Kerala",
    category: "MINIMAL",
    year: "2026",
    description:
      "Clean architectural lines meet expressive stone surfaces in a calm, minimal composition.",
    image: project2,
  },
  {
    id: 3,
    number: "03",
    title: "The Glass House",
    location: "Calicut, Kerala",
    category: "CONTEMPORARY",
    year: "2025",
    description:
      "A light-filled kitchen where glass, timber and subtle metal details create visual openness.",
    image: project3,
  },
  {
    id: 4,
    number: "04",
    title: "The Detail Kitchen",
    location: "Kottayam, Kerala",
    category: "CLASSIC",
    year: "2025",
    description:
      "Timeless cabinetry and refined hardware come together in a quietly luxurious kitchen.",
    image: project4,
  },
];

const OurWork = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [beforePosition, setBeforePosition] = useState(50);

  const featuredProject = projects[activeProject];

  const nextProject = () => {
    setActiveProject((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="ourWork">
      {/* INTRO */}
      <section className="ourWork-intro">
        <div className="ourWork-intro-content">
          <h2>
            Every kitchen
            has a <em> story.</em>
          </h2>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="ourWork-featured">
        <div className="ourWork-featured-image">
          <img
            src={featuredProject.image}
            alt={featuredProject.title}
          />

          <div className="ourWork-featured-overlay" />

          <div className="ourWork-featured-top">
            <span>{featuredProject.number}</span>
            <span>{featuredProject.year}</span>
          </div>

          <div className="ourWork-featured-bottom">
            <div>
              <span>{featuredProject.category}</span>
              <h3>{featuredProject.title}</h3>
            </div>

            <ArrowUpRight size={25} />
          </div>
        </div>

        <div className="ourWork-featured-info">
          <span className="ourWork-small-label">
            FEATURED RESIDENCE
          </span>

          <h3>{featuredProject.title}</h3>

          <p>{featuredProject.description}</p>

          <div className="ourWork-project-meta">
            <div>
              <span>LOCATION</span>
              <strong>{featuredProject.location}</strong>
            </div>

            <div>
              <span>YEAR</span>
              <strong>{featuredProject.year}</strong>
            </div>

            <div>
              <span>STYLE</span>
              <strong>{featuredProject.category}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={nextProject}
            className="ourWork-view-project"
          >
            Next project
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="ourWork-beforeAfter">
        <div className="ourWork-beforeAfter-header">
          <h2>See The Results</h2>
          <p>
            Drag across the image to see how thoughtful design
            can completely transform a space.
          </p>
        </div>
        <div className="ourWork-beforeAfter-slider">
          <img
            src={before}
            alt="Finished kitchen"
            className="ourWork-after-image"
          />

          <div
            className="ourWork-before-image"
            style={{
              width: `${beforePosition}%`,
            }}
          >
            <img
              src={after}
              alt="Kitchen before transformation"
            />
          </div>

          <div
            className="ourWork-slider-line"
            style={{
              left: `${beforePosition}%`,
            }}
          >
            <div className="ourWork-slider-handle">
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </div>
          </div>

          <span className="ourWork-before-label">
            BEFORE
          </span>

          <span className="ourWork-after-label">
            AFTER
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value={beforePosition}
            onChange={(e) =>
              setBeforePosition(Number(e.target.value))
            }
            aria-label="Before and after comparison"
          />
        </div>
      </section>

      {/* PROJECT STORY */}
      <section className="ourWork-story">
        <div className="ourWork-story-image">
          <img
            src={img1}
            alt="Kitchen project"
          />
        </div>

        <div className="ourWork-story-content">
          <h2>
            Designed
            <br />
            <em>with purpose.</em>
          </h2>

          <p>
            We don't begin with cabinets. We begin with
            understanding how the space should feel and how
            it needs to work.
          </p>

          <div className="ourWork-story-steps">
            <div>
              <span>01</span>
              <strong>UNDERSTAND</strong>
              <p>Your space, lifestyle and needs.</p>
            </div>

            <div>
              <span>02</span>
              <strong>DESIGN</strong>
              <p>A kitchen made around your life.</p>
            </div>

            <div>
              <span>03</span>
              <strong>CREATE</strong>
              <p>Crafted carefully from detail to finish.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurWork;