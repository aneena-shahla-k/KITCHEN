import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import "./KitchenLayouts.css";

import lShape from "../../images/projects/l-shaped.jpg";
import uShape from "../../images/projects/u-shaped.jpg";
import parallel from "../../images/projects/parallel.jpg";
import island from "../../images/projects/island.jpg";

const layouts = [
  {
    id: "l-shaped",
    name: "L-Shaped",
    description:
      "A practical layout that makes the most of corner spaces.",
    image: lShape,
  },
  {
    id: "u-shaped",
    name: "U-Shaped",
    description:
      "Designed for generous storage, preparation and movement.",
    image: uShape,
  },
  {
    id: "parallel",
    name: "Parallel",
    description:
      "A smart solution for compact and efficient kitchens.",
    image: parallel,
  },
  {
    id: "island",
    name: "Island",
    description:
      "An open layout built around cooking, gathering and living.",
    image: island,
  },
];

const KitchenLayouts = () => {
  const navigate = useNavigate();

  const handleLayoutClick = (layoutId) => {
    navigate(`/kitchens?layout=${layoutId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleViewAll = () => {
    navigate("/kitchens");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="kitchen-layouts" id="kitchen-layouts">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="kitchen-layouts-header">

        <div>
          <span className="kitchen-layouts-label">
            CHOOSE YOUR LAYOUT
          </span>

          <h2>
            Find the right
            <br />
            <span>way to use your space.</span>
          </h2>
        </div>

        <div className="kitchen-layouts-intro">

          <p>
            Explore different kitchen layouts and find
            the one that works naturally with your home.
          </p>

          <button
            type="button"
            className="kitchen-layouts-view-all"
            onClick={handleViewAll}
          >
            View all kitchens

            <span>
              <ArrowUpRight size={15} />
            </span>
          </button>

        </div>

      </div>


      {/* =========================================
          LAYOUT CARDS
      ========================================= */}

     <div className="kitchen-layouts-grid">
  {layouts.map((layout, index) => (
    <button
      key={layout.id}
      type="button"
      className="kitchen-layout-card"
      onClick={() => handleLayoutClick(layout.id)}
    >
      {/* IMAGE */}
      <div className="kitchen-layout-image">
        <img
          src={layout.image}
          alt={layout.name}
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="kitchen-layout-overlay" />
        <span className="kitchen-layout-number">0{index + 1}</span>
        <span className="kitchen-layout-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* CONTENT */}
      <div className="kitchen-layout-content">
        <div className="kitchen-layout-text">
          <span className="kitchen-layout-small-label">KITCHEN LAYOUT</span>
          <h3>{layout.name}</h3>
        </div>
        <p>{layout.description}</p>
      </div>
    </button>
  ))}
</div>

    </section>
  );
};

export default KitchenLayouts;