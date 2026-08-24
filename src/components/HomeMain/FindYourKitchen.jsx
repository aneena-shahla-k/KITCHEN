import React from "react";
import { useNavigate } from "react-router-dom";
import "./FindYourKitchen.css";

// Replace these with your actual kitchen images
import newKitchen from "../../images/projects/IMG_8267.jpg";
import renovation from "../../images/projects/IMG_8270.jpg";
import storage from "../../images/projects/IMG_8265.jpg";
import inspiration from "../../images/projects/IMG_8264.jpg";

const kitchenOptions = [
  {
    id: "new",
    number: "01",
    label: "NEW KITCHEN",
    title: "Design from the beginning",
    image: newKitchen,
    path: "/kitchens",
    size: "large",
  },
  {
    id: "renovation",
    number: "02",
    label: "RENOVATION",
    title: "Give your kitchen a new life",
    image: renovation,
    path: "/renovation",
    size: "small",
  },
  {
    id: "storage",
    number: "03",
    label: "SMART STORAGE",
    title: "Make every corner count",
    image: storage,
    path: "/storage-solutions",
    size: "small",
  },
  {
    id: "inspiration",
    number: "04",
    label: "INSPIRATION",
    title: "Find a kitchen you love",
    image: inspiration,
    path: "/inspiration",
    size: "wide",
  },
];

const FindYourKitchen = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="find-kitchen">
      <div className="find-kitchen__container">

        {/* Header */}
        <div className="find-kitchen__header">

          <div className="find-kitchen__heading-wrap">
            <span className="find-kitchen__eyebrow">
              EXPLORE YOUR OPTIONS
            </span>

            <h2>
              Find your
              <br />
              <span>kitchen.</span>
            </h2>
          </div>

          <p className="find-kitchen__intro">
            Whether you're starting from scratch, updating an existing
            kitchen or simply looking for ideas, start with what feels
            right for your home.
          </p>

        </div>

        {/* Image Grid */}
        <div className="find-kitchen__grid">

          {kitchenOptions.map((item) => (
            <article
              key={item.id}
              className={`find-kitchen__card find-kitchen__card--${item.size}`}
              onClick={() => handleCardClick(item.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleCardClick(item.path);
                }
              }}
            >

              {/* Image */}
              <div className="find-kitchen__image-wrap">

                <img
                  src={item.image}
                  alt={item.title}
                  className="find-kitchen__image"
                />

                <div className="find-kitchen__overlay" />

                {/* Number */}
                <span className="find-kitchen__number">
                  {item.number}
                </span>

                {/* Arrow */}
                <span className="find-kitchen__arrow">
                  ↗
                </span>

                {/* Content */}
                <div className="find-kitchen__content">

                  <span className="find-kitchen__label">
                    {item.label}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <span className="find-kitchen__explore">
                    Explore
                    <span className="find-kitchen__line" />
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FindYourKitchen;