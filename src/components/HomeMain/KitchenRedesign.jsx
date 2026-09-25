import React, { useEffect, useRef, useState } from "react";
import "./KitchenRedesign.css";

import kitchenImage from "../../images/home/home.png";

const KitchenRedesign = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState("cabinet");
  const [selectedFinish, setSelectedFinish] = useState("Walnut");
  const [isVisible, setIsVisible] = useState(false);
  const [dragging, setDragging] = useState(false);

  const finishes = [
    {
      name: "Matte White",
      color: "#eeeae2",
    },
    {
      name: "Walnut",
      color: "#805d3d",
    },
    {
      name: "Charcoal",
      color: "#555653",
    },
    {
      name: "Custom",
      color: "#737d68",
    },
  ];

  const hotspots = [
    {
      id: "cabinet",
      label: "Cabinet",
      shortLabel: "Cabinet",
      description: "Matt-finish laminate",
      quality: "Premium grade",
      price: "₹65,000+",
      x: 48,
      y: 38,
    },
    {
      id: "countertop",
      label: "Countertop",
      shortLabel: "Countertop",
      description: "Quartz",
      quality: "20-year* manufacturer warranty",
      price: "₹85,000+",
      x: 60,
      y: 65,
    },
    {
      id: "drawer",
      label: "Drawer System",
      shortLabel: "Drawer System",
      description: "Soft-close hardware",
      quality: "Premium hardware",
      price: "₹45,000+",
      x: 69,
      y: 78,
    },
    {
      id: "lighting",
      label: "Lighting",
      shortLabel: "Lighting",
      description: "Warm LED profile lighting",
      quality: "Energy efficient",
      price: "₹15,000+",
      x: 77,
      y: 25,
    },
  ];

  /* =========================================
     SECTION REVEAL
  ========================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* =========================================
     SLIDER
  ========================================= */

  const updateSlider = (clientX) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    let percentage =
      ((clientX - rect.left) / rect.width) * 100;

    percentage = Math.max(5, Math.min(95, percentage));

    setSliderPosition(percentage);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;

    updateSlider(event.clientX);
  };

  const handlePointerDown = (event) => {
    setDragging(true);

    updateSlider(event.clientX);

    if (sliderRef.current) {
      sliderRef.current.setPointerCapture?.(
        event.pointerId
      );
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  /* =========================================
     FINISH CLASS
  ========================================= */

  const getFinishClass = () => {
    switch (selectedFinish) {
      case "Matte White":
        return "finish-white";

      case "Charcoal":
        return "finish-charcoal";

      case "Custom":
        return "finish-custom";

      default:
        return "finish-walnut";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`kitchen-redesign ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="kitchen-redesign-inner">

        {/* =========================================
            TOP LABEL
        ========================================= */}

        <div className="redesign-top-label">
          <span className="label-line"></span>

          <span>03</span>

          <span>/</span>

          <span>
            YOUR KITCHEN — REDESIGNED
          </span>
        </div>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="redesign-main">

          {/* =======================================
              LEFT CONTENT
          ======================================= */}

          <div className="redesign-intro">

            <h2>
              Your Kitchen
              <span>—</span>
              <br />
              Redesigned
            </h2>

            <p>
              Explore how premium materials, smart
              storage and thoughtful design come
              together to create a kitchen that fits
              your lifestyle.
            </p>

            <div className="redesign-toggle">

              <button className="toggle-active">
                Before
              </button>

              <button>
                After
              </button>

            </div>

            <div className="drag-hint">

              <span className="drag-icon">
                ↔
              </span>

              <span>
                Drag to see the transformation
              </span>

            </div>

          </div>


          {/* =======================================
              IMAGE / SLIDER
          ======================================= */}

          <div
            ref={sliderRef}
            className={`redesign-visual ${getFinishClass()}`}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerDown={handlePointerDown}
          >

            {/* AFTER */}

            <div className="redesign-after">

              <img
                src={kitchenImage}
                alt="Redesigned kitchen"
              />

            </div>


            {/* BEFORE */}

            <div
              className="redesign-before"
              style={{
                width: `${sliderPosition}%`,
              }}
            >

              <div className="before-image-inner">

                <img
                  src={kitchenImage}
                  alt="Original kitchen"
                />

              </div>

            </div>


            {/* BEFORE LABEL */}

            <div className="visual-label visual-label-before">
              Before
            </div>


            {/* AFTER LABEL */}

            <div className="visual-label visual-label-after">
              After
            </div>


            {/* SLIDER */}

            <div
              className="slider-divider"
              style={{
                left: `${sliderPosition}%`,
              }}
            >

              <div className="slider-handle">

                <span>‹</span>

                <span>›</span>

              </div>

            </div>


            {/* =====================================
                HOTSPOTS
            ====================================== */}

            {hotspots.map((spot) => (

              <button
                key={spot.id}
                className={`kitchen-hotspot ${
                  activeHotspot === spot.id
                    ? "active"
                    : ""
                }`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveHotspot(spot.id);
                }}
              >

                <span className="hotspot-plus">
                  +
                </span>

                <span className="hotspot-label">
                  {spot.shortLabel}
                </span>

              </button>

            ))}

          </div>


          {/* =======================================
              FINISH PANEL
          ======================================= */}

          <div className="finish-panel">

            <div className="finish-panel-title">
              Change Cabinet Finish
            </div>

            <p>
              See how different finishes
              transform your kitchen.
            </p>

            <div className="finish-options">

              {finishes.map((finish) => (

                <button
                  key={finish.name}
                  className={`finish-option ${
                    selectedFinish === finish.name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedFinish(finish.name)
                  }
                >

                  <span
                    className="finish-swatch"
                    style={{
                      background: finish.color,
                    }}
                  ></span>

                  <span className="finish-name">
                    {finish.name}
                  </span>

                  {selectedFinish === finish.name && (
                    <span className="finish-check">
                      ✓
                    </span>
                  )}

                </button>

              ))}

            </div>

            <div className="finish-divider"></div>

            <button className="apply-design-btn">

              <span>
                Apply to Design
              </span>

              <span>
                →
              </span>

            </button>

          </div>

        </div>


        {/* =========================================
            DETAILS
        ========================================= */}

        <div className="details-section">

          <div className="details-intro">

            <div className="details-label">
              EXPLORE THE DETAILS
            </div>

            <h3>
              Click on a hotspot
              <br />
              to learn more
            </h3>

            <span className="details-line"></span>

          </div>


          <div className="details-grid">

            {hotspots.map((item) => (

              <button
                key={item.id}
                className={`detail-card ${
                  activeHotspot === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveHotspot(item.id)
                }
              >

                <div className="detail-image">

                  <img
                    src={kitchenImage}
                    alt={item.label}
                  />

                  <span className="detail-image-dot">
                    {item.id === "lighting"
                      ? "+"
                      : "●"}
                  </span>

                </div>

                <div className="detail-content">

                  <h4>
                    {item.label}
                  </h4>

                  <span>
                    {item.description}
                  </span>

                  <span>
                    {item.quality}
                  </span>

                  <div className="detail-bottom">

                    <strong>
                      {item.price}
                    </strong>

                    <span className="detail-arrow">
                      →
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default KitchenRedesign;