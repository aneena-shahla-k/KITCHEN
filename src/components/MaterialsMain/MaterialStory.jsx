import React, { useEffect, useRef, useState } from "react";
import "./materialStory.css";

import acrylic from "../../images/material/acrylic.jpg";
import matte from "../../images/material/matte.jpg";
import veneer from "../../images/material/natutral.jpg";
import puFinish from "../../images/material/pufinish.jpg";

const storyItems = [
  {
    number: "01",
    label: "THE MATERIAL",
    title: "Every kitchen starts with a surface.",
    description:
      "Before the colour, before the details, there is the material. The right surface sets the foundation for the entire kitchen.",
    image: acrylic,
    material: "Acrylic",
  },
  {
    number: "02",
    label: "THE FINISH",
    title: "Then comes the finish.",
    description:
      "Glossy, soft, natural or refined. A finish changes the way light moves through the space and how the kitchen feels.",
    image: matte,
    material: "Matte Laminate",
  },
  {
    number: "03",
    label: "THE CHARACTER",
    title: "Every texture tells a story.",
    description:
      "Natural grains bring warmth. Smooth surfaces bring simplicity. Each material creates its own character.",
    image: veneer,
    material: "Natural Veneer",
  },
  {
    number: "04",
    label: "THE KITCHEN",
    title: "And finally, it becomes your kitchen.",
    description:
      "The material becomes part of something bigger — a kitchen designed around your space, your style and the way you live.",
    image: puFinish,
    material: "PU Finish",
  },
];

const MaterialStory = () => {
  const sectionRef = useRef(null);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const start = -rect.top;
      const scrollable = sectionHeight - viewportHeight;

      if (scrollable <= 0) return;

      const progress = Math.min(
        Math.max(start / scrollable, 0),
        0.999
      );

      const index = Math.min(
        Math.floor(progress * storyItems.length),
        storyItems.length - 1
      );

      setActive(index);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const current = storyItems[active];

  return (
    <section
      ref={sectionRef}
      className="material-story"
    >
      <div className="material-story-sticky">

        {/* =========================================
            INTRO
        ========================================= */}

        <div className="material-story-intro">

          <span className="material-story-eyebrow">
            THE MATERIAL STORY
          </span>

          <h2>
            Every kitchen
            <br />
            starts with a <em>surface.</em>
          </h2>

          <p>
            Explore how a simple material becomes
            part of the kitchen you live with every day.
          </p>

        </div>


        {/* =========================================
            MAIN STORY
        ========================================= */}

        <div className="material-story-main">

          {/* LEFT TEXT */}

          <div className="material-story-content">

            <span className="material-story-number">
              {current.number}
            </span>

            <span className="material-story-label">
              {current.label}
            </span>

            <h3 key={`title-${active}`}>
              {current.title}
            </h3>

            <p key={`description-${active}`}>
              {current.description}
            </p>

            <div className="material-story-material">
              <span>CURRENT MATERIAL</span>

              <strong>
                {current.material}
              </strong>
            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="material-story-visual">

            <div className="material-story-image-wrap">

              <img
                key={current.image}
                src={current.image}
                alt={current.material}
              />

              <div className="material-story-image-overlay" />

              <div className="material-story-image-name">
                {current.material}
              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            PROGRESS
        ========================================= */}

        <div className="material-story-progress">

          <div className="material-story-progress-line">

            {storyItems.map((item, index) => (
              <div
                key={item.number}
                className={`material-story-progress-item ${
                  active === index ? "active" : ""
                }`}
              >
                <span>{item.number}</span>

                <div className="material-story-progress-dot" />

                <small>
                  {item.label}
                </small>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default MaterialStory;