import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import "./ProjectsReveal.css";

import img1 from "../../images/projects/IMG_8271.jpg";
import img2 from "../../images/projects/IMG_8270.jpg";
import img3 from "../../images/projects/IMG_8269.jpg";
import img4 from "../../images/projects/IMG_8268.jpg";
import img5 from "../../images/projects/IMG_8265.jpg";
import img6 from "../../images/projects/IMG_8264.jpg";

const projects = [
  {
    id: "01",
    title: "Modern Residence",
    location: "Calicut, Kerala",
    area: "180 sq.ft.",
    style: "Warm Minimal",
    material: "Natural Veneer & Matte PU",
    image: img1,
  },
  {
    id: "02",
    title: "Contemporary Haven",
    location: "Kozhikode, Kerala",
    area: "210 sq.ft.",
    style: "Contemporary",
    material: "Matte Laminate",
    image: img2,
  },
  {
    id: "03",
    title: "The Minimal House",
    location: "Calicut, Kerala",
    area: "165 sq.ft.",
    style: "Minimal",
    material: "Acrylic & Veneer",
    image: img3,
  },
  {
    id: "04",
    title: "Earth & Form",
    location: "Kannur, Kerala",
    area: "195 sq.ft.",
    style: "Organic Modern",
    material: "Natural Veneer",
    image: img4,
  },
  {
    id: "05",
    title: "Urban Luxe",
    location: "Kochi, Kerala",
    area: "240 sq.ft.",
    style: "Luxury Modern",
    material: "PU & Fluted Glass",
    image: img5,
  },
  {
    id: "06",
    title: "Quiet Elegance",
    location: "Malappuram, Kerala",
    area: "175 sq.ft.",
    style: "Soft Contemporary",
    material: "Membrane & Glass",
    image: img6,
  },
];

export default function ProjectsReveal() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const project = projects[currentProject];

  const changeProject = (direction) => {
    if (isChanging) return;

    setIsChanging(true);
    setIsOpen(false);

    setTimeout(() => {
      setCurrentProject((prev) => {
        if (direction === "next") {
          return prev === projects.length - 1 ? 0 : prev + 1;
        }

        return prev === 0 ? projects.length - 1 : prev - 1;
      });

      setTimeout(() => {
        setIsOpen(true);
        setIsChanging(false);
      }, 450);
    }, 750);
  };

  const openProject = () => {
    if (!isChanging) {
      setIsOpen(true);
    }
  };

  return (
    <section className="pr-section">
      <div className="pr-wrapper">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="pr-header">

          <div className="pr-heading-group">
            <span className="pr-label">
              INTERACTIVE SHOWCASE
            </span>

            <h2>
              Spaces made
              <span> personal.</span>
            </h2>
          </div>

          <p className="pr-header-description">
            A glimpse into bespoke kitchens designed
            <br />
            around the way people cook and gather.
          </p>

        </div>


        {/* =========================================
            PROJECT AREA
        ========================================= */}

        <div className="pr-layout">


          {/* =====================================
              LEFT INFORMATION
          ===================================== */}

          <div className="pr-side-info">

            <span className="pr-project-count">
              {project.id} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>

            <div className="pr-side-line" />

            <span className="pr-side-text">
              {isOpen ? (
                <>
                  EXPLORE
                  <br />
                  PROJECT
                </>
              ) : (
                <>
                  OPEN
                  <br />
                  TO
                  <br />
                  REVEAL
                </>
              )}
            </span>

          </div>


          {/* =====================================
              MAIN STAGE
          ===================================== */}

          <div className="pr-stage">


            {/* =================================
                PROJECT IMAGE
            ================================= */}

            <AnimatePresence mode="sync">

              <motion.div
                key={project.id}
                className="pr-image"
                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  scale: isOpen ? 1 : 1.035,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="pr-image-overlay" />

              </motion.div>

            </AnimatePresence>


            {/* =================================
                CABINET FRAME
            ================================= */}

            <div className="pr-frame">

              <div className="pr-frame-top" />
              <div className="pr-frame-left" />
              <div className="pr-frame-right" />
              <div className="pr-frame-bottom" />


              {/* ===============================
                  CABINET DOOR
              =============================== */}

              <motion.div
                className="pr-door"
                animate={{
                  rotateY: isOpen ? -103 : 0,
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: "left center",
                }}
                onClick={openProject}
              >

                <div className="pr-door-surface">


                  {/* NUMBER */}

                  <span className="pr-door-number">
                    CASE STUDY {project.id}
                  </span>


                  {/* HANDLE */}

                  <div className="pr-door-handle">
                    <span />
                  </div>


                  {/* DOOR TEXT */}

                  <div className="pr-door-text">

                    <span>
                      {project.style.toUpperCase()}
                    </span>

                    <strong>
                      {project.material.split("&")[0].trim()}
                    </strong>

                  </div>

                </div>

              </motion.div>

            </div>


            {/* =================================
                REVEAL BUTTON
            ================================= */}

            <AnimatePresence mode="wait">

              {!isOpen && !isChanging && (

                <motion.button
                  key={`open-${project.id}`}
                  className="pr-open"
                  onClick={openProject}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >

                  <span>
                    REVEAL KITCHEN
                  </span>

                  <span className="pr-open-circle">
                    <ArrowUpRight size={14} />
                  </span>

                </motion.button>

              )}

            </AnimatePresence>


            {/* =================================
                PROJECT DETAILS
            ================================= */}

            <AnimatePresence mode="wait">

              {isOpen && !isChanging && (

                <motion.div
                  key={`details-${project.id}`}
                  className="pr-details"
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 12,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.55,
                  }}
                >

                  <span className="pr-details-label">
                    FEATURED PROJECT · {project.id}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <div className="pr-meta">

                    <span>
                      {project.location}
                    </span>

                    <span>
                      {project.area}
                    </span>

                    <span>
                      {project.style}
                    </span>

                    <span>
                      {project.material}
                    </span>

                  </div>

                  <a
                    href="/projects"
                    className="pr-explore"
                  >

                    <span>
                      VIEW PROJECT STUDY
                    </span>

                    <ArrowUpRight size={15} />

                  </a>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>


        {/* =========================================
            PROJECT NAVIGATION
        ========================================= */}

        <div className="pr-bottom">


          {/* PREVIOUS */}

          <button
            className="pr-nav-button"
            onClick={() => changeProject("prev")}
            disabled={isChanging}
            aria-label="Previous project"
          >

            <ArrowLeft size={14} />

            <span>
              PREV
            </span>

          </button>


          {/* PROGRESS */}

          <div className="pr-progress-wrapper">

            <span>
              {project.id}
            </span>

            <div className="pr-line">

              <motion.div
                animate={{
                  width: `${
                    ((currentProject + 1) /
                      projects.length) *
                    100
                  }%`,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

            </div>

            <span>
              {String(projects.length).padStart(2, "0")}
            </span>

          </div>


          {/* NEXT */}

          <button
            className="pr-nav-button"
            onClick={() => changeProject("next")}
            disabled={isChanging}
            aria-label="Next project"
          >

            <span>
              NEXT
            </span>

            <ArrowRight size={14} />

          </button>

        </div>

      </div>
    </section>
  );
}