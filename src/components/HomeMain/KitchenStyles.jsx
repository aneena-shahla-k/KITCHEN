import React, { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";
import "../../styles/HomeStyles/kitchenStyles.css";

import modern from "../../images/modernn.jpg";
import minimal from "../../images/minimal.jpg";
import luxury from "../../images/luxury.jpg";
import classic from "../../images/classic.jpg";
import wood from "../../images/wood.jpg";
import shaped from "../../images/l-shaped.jpg";

const styles = [
  {
    name: "Modern",
    number: "01",
    image: modern,
    description:
      "Clean lines, refined surfaces and contemporary living.",
  },
  {
    name: "Minimal",
    number: "02",
    image: minimal,
    description:
      "Quiet forms designed around simplicity and balance.",
  },
  {
    name: "Luxury",
    number: "03",
    image: luxury,
    description:
      "Rich materials and sophisticated details for timeless interiors.",
  },
  {
    name: "Classic",
    number: "04",
    image: classic,
    description:
      "Elegant proportions with a warm and enduring character.",
  },
  {
    name: "Warm Wood",
    number: "05",
    image: wood,
    description:
      "Natural textures bringing warmth into everyday spaces.",
  },
  {
    name: "L-Shaped",
    number: "06",
    image: shaped,
    description:
      "Smart spatial planning with effortless functionality.",
  },
];

const KitchenStyles = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % styles.length);
  };

  const previous = () => {
    setActive(
      (prev) => (prev - 1 + styles.length) % styles.length
    );
  };

  const current = styles[active];

  return (
    <section className="kitchen-styles" id="styles">

      <div className="styles-top">

        <div className="styles-title">
          <span className="section-label">
            OUR COLLECTION
          </span>

          <h2>
            Spaces with
            <br />
            <em>character.</em>
          </h2>
        </div>

        <div className="styles-intro">
          <p>
            Explore a curated collection of kitchen
            interiors, each designed around a different
            way of living.
          </p>

          <a
            href="/kitchens"
            className="view-all"
          >
            Explore all styles
            <span>
              <ArrowRight size={15} />
            </span>
          </a>
        </div>

      </div>

      <div className="styles-showcase">

        <div className="style-number">
          <span>STYLE</span>
          <strong>{current.number}</strong>
        </div>

        <div className="style-preview">

          <img
            key={current.image}
            src={current.image}
            alt={current.name}
          />

          <div className="preview-gradient" />

          <div className="preview-watermark">
            {current.number}
          </div>

          <div className="style-info-glass">

            <span className="style-info-label">
              CURRENT STYLE
            </span>

            <h3>{current.name}</h3>

            <p>{current.description}</p>

            <button
              type="button"
              className="discover-style"
            >
              Discover
              <MoveUpRight size={15} />
            </button>

          </div>

          <div className="preview-controls">

            <button
              type="button"
              onClick={previous}
              aria-label="Previous style"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next style"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

        <div className="style-rail">

          <div className="rail-line">
            <span
              style={{
                width: `${((active + 1) / styles.length) * 100}%`,
              }}
            />
          </div>

          <div className="style-cards">

            {styles.map((style, index) => (
              <button
                key={style.name}
                type="button"
                className={`style-card ${
                  active === index ? "active" : ""
                }`}
                onClick={() => setActive(index)}
              >

                <div className="style-card-image">
                  <img
                    src={style.image}
                    alt={style.name}
                  />

                  <div className="style-card-overlay" />
                </div>

                <div className="style-card-content">

                  <span>
                    {style.number}
                  </span>

                  <strong>
                    {style.name}
                  </strong>

                </div>

              </button>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default KitchenStyles;