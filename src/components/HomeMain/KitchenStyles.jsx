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
      "Clean lines, practical storage and a fresh contemporary look.",
  },
  {
    name: "Minimal",
    number: "02",
    image: minimal,
    description:
      "Simple forms and uncluttered spaces made for everyday living.",
  },
  {
    name: "Luxury",
    number: "03",
    image: luxury,
    description:
      "Premium finishes and thoughtful details for an elegant kitchen.",
  },
  {
    name: "Classic",
    number: "04",
    image: classic,
    description:
      "A timeless kitchen style with warmth, comfort and character.",
  },
  {
    name: "Warm Wood",
    number: "05",
    image: wood,
    description:
      "Natural wood tones that bring warmth and personality to your home.",
  },
  {
    name: "L-Shaped",
    number: "06",
    image: shaped,
    description:
      "A practical layout that makes smart use of available space.",
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

      {/* HEADER */}

      <div className="styles-top">

        <div className="styles-title">
          <span className="section-label">
            KITCHEN STYLES
          </span>

          <h2>
            Find a style
            <br />
            <span>you'll love.</span>
          </h2>
        </div>

        <div className="styles-intro">

          <p>
            Explore different kitchen styles and find
            the look that feels right for your home.
          </p>

          <a
            href="/kitchens"
            className="view-all"
          >
            View all kitchens

            <span>
              <ArrowRight size={15} />
            </span>
          </a>

        </div>

      </div>

      {/* SHOWCASE */}

      <div className="styles-showcase">

        <div className="style-number">

          <span>STYLE</span>

          <strong>
            {current.number}
          </strong>

        </div>

        <div className="style-preview">

          <img
            key={current.image}
            src={current.image}
            alt={current.name}
          />

          <div className="preview-gradient" />

          {/* IMAGE NUMBER */}

          <div className="preview-number">
            {current.number}
          </div>

          {/* INFORMATION */}

          <div className="style-info">

            <span className="style-info-label">
              {current.number} / {styles.length}
            </span>

            <h3>
              {current.name}
            </h3>

            <p>
              {current.description}
            </p>

            <button
              type="button"
              className="discover-style"
            >
              Explore style
              <MoveUpRight size={15} />
            </button>

          </div>

          {/* CONTROLS */}

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

        {/* STYLE LIST */}

        <div className="style-rail">

          <div className="rail-line">
            <span
              style={{
                width: `${
                  ((active + 1) / styles.length) * 100
                }%`,
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