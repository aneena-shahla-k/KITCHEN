import React, { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "../../styles/HomeStyles/materialsCraftsmanship.css";

import wood from "../../images/wood2.jpg";
import stone from "../../images/stone.jpg";
import glass from "../../images/glass.jpg";
import hardware from "../../images/hardware.jpg";

const materials = [
  {
    number: "01",
    name: "Natural Wood",
    subtitle: "WARMTH & CHARACTER",
    description:
      "Warm wood tones bring a natural Kerala-inspired character to the kitchen while creating a timeless, welcoming atmosphere.",
    image: wood
  },
  {
    number: "02",
    name: "Stone & Quartz",
    subtitle: "STRENGTH & ELEGANCE",
    description:
      "Durable stone and quartz surfaces bring a refined finish while standing up beautifully to everyday kitchen life.",
    image: stone
  },
  {
    number: "03",
    name: "Glass Details",
    subtitle: "LIGHT & BALANCE",
    description:
      "Carefully placed glass elements add depth, light and a contemporary touch without making the space feel heavy.",
    image: glass
  },
  {
    number: "04",
    name: "Fine Hardware",
    subtitle: "PRECISION IN EVERY DETAIL",
    description:
      "Smooth hinges, drawers and fittings make everyday movement feel effortless while keeping the design beautifully clean.",
    image: hardware
  }
];

const MaterialsCraftsmanship = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) =>
      prev === materials.length - 1 ? 0 : prev + 1
    );
  };

  const previous = () => {
    setActive((prev) =>
      prev === 0 ? materials.length - 1 : prev - 1
    );
  };

  const current = materials[active];

  return (
    <section className="materials-section">

      <div className="materials-inner">

        {/* HEADER */}

        <div className="materials-header">

          <div className="materials-label">
            <span>DETAILS MATTER</span>
            <div />
            <span>04 MATERIALS</span>
          </div>

          <h2>
            Made with
            <br />
            <em>intention.</em>
          </h2>

          <p>
            Beautiful kitchens begin with materials
            chosen not only for how they look,
            but for how they live.
          </p>

        </div>


        {/* SHOWCASE */}

        <div className="materials-showcase">

          {/* IMAGE */}

          <div className="materials-image-wrap">

            {materials.map((material, index) => (
              <img
                key={material.number}
                src={material.image}
                alt={material.name}
                className={
                  index === active
                    ? "material-image active"
                    : "material-image"
                }
              />
            ))}

            <div className="materials-image-overlay" />


            {/* IMAGE LABEL */}

            <div className="image-label">

              <span>SELECTED MATERIAL</span>

              <strong>
                {current.name}
              </strong>

            </div>


            {/* CONTROLS */}

            <div className="material-controls">

              <button
                type="button"
                onClick={previous}
                aria-label="Previous material"
              >
                <ChevronLeft size={16} />
              </button>

              <span>
                {current.number} / 04
              </span>

              <button
                type="button"
                onClick={next}
                aria-label="Next material"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>


          {/* GLASS CONTENT */}

          <div className="material-info">

            <div className="material-number">
              {current.number}
            </div>

            <div className="material-copy">

              <span className="material-subtitle">
                {current.subtitle}
              </span>

              <h3>
                {current.name}
              </h3>

              <p>
                {current.description}
              </p>

            </div>


            {/* MATERIAL SELECTOR */}

            <div className="material-list">

              {materials.map((material, index) => (
                <button
                  key={material.number}
                  type="button"
                  className={
                    active === index
                      ? "material-option active"
                      : "material-option"
                  }
                  onClick={() => setActive(index)}
                >

                  <span>
                    {material.number}
                  </span>

                  <strong>
                    {material.name}
                  </strong>

                  <ArrowUpRight size={13} />

                </button>
              ))}

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="materials-footer">

          <span>
            MATERIALS • FINISHES • DETAILS
          </span>

          <div />

          <span>
            MADE FOR EVERYDAY LIVING
          </span>

        </div>

      </div>

    </section>
  );
};

export default MaterialsCraftsmanship;