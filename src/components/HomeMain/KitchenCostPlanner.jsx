import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Info,
} from "lucide-react";

import "./kitchenCostPlanner.css";

const layoutOptions = [
  {
    id: "lshape",
    name: "L-Shape",
    short: "L",
    multiplier: 1,
    description:
      "A practical layout that works well for most homes.",
  },
  {
    id: "ushape",
    name: "U-Shape",
    short: "U",
    multiplier: 1.18,
    description:
      "More counter space and storage for larger kitchens.",
  },
  {
    id: "parallel",
    name: "Parallel",
    short: "II",
    multiplier: 1.08,
    description:
      "Efficient planning for kitchens with two working sides.",
  },
  {
    id: "island",
    name: "Island",
    short: "I",
    multiplier: 1.3,
    description:
      "A spacious layout with an additional central workspace.",
  },
];

const sizeOptions = [
  {
    id: "small",
    name: "Small",
    range: "Up to 60 sq.ft",
    multiplier: 0.82,
  },
  {
    id: "medium",
    name: "Medium",
    range: "60–100 sq.ft",
    multiplier: 1,
  },
  {
    id: "large",
    name: "Large",
    range: "100+ sq.ft",
    multiplier: 1.3,
  },
];

const finishOptions = [
  {
    id: "laminate",
    name: "Laminate",
    multiplier: 0.9,
    description:
      "Practical, durable and available in many colours.",
  },
  {
    id: "acrylic",
    name: "Acrylic",
    multiplier: 1.12,
    description:
      "Smooth high-gloss finish with a clean contemporary look.",
  },
  {
    id: "pu",
    name: "PU",
    multiplier: 1.22,
    description:
      "A refined painted finish with a smooth premium appearance.",
  },
  {
    id: "veneer",
    name: "Veneer",
    multiplier: 1.28,
    description:
      "Natural wood character with a warm and elegant appearance.",
  },
];

const hardwareOptions = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1,
    description:
      "Reliable everyday hardware for regular kitchen use.",
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.18,
    description:
      "Enhanced hardware with smoother movement and soft closing.",
  },
];

const BASE_PRICE = 280000;

const formatLakhs = (value) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

const KitchenCostPlanner = () => {
  const [layout, setLayout] = useState("lshape");
  const [size, setSize] = useState("medium");
  const [finish, setFinish] = useState("acrylic");
  const [hardware, setHardware] = useState("premium");

  const selectedLayout = layoutOptions.find(
    (item) => item.id === layout
  );

  const selectedSize = sizeOptions.find(
    (item) => item.id === size
  );

  const selectedFinish = finishOptions.find(
    (item) => item.id === finish
  );

  const selectedHardware = hardwareOptions.find(
    (item) => item.id === hardware
  );

  const estimate = useMemo(() => {
    const base =
      BASE_PRICE *
      selectedLayout.multiplier *
      selectedSize.multiplier *
      selectedFinish.multiplier *
      selectedHardware.multiplier;

    const lower = Math.round(base / 10000) * 10000;

    const upper =
      Math.round((base * 1.35) / 10000) * 10000;

    return {
      lower,
      upper,
    };
  }, [
    selectedLayout,
    selectedSize,
    selectedFinish,
    selectedHardware,
  ]);

  return (
    <section className="kitchen-cost-planner">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="cost-planner-header">

        <div>

          <span className="cost-planner-label">
            KITCHEN COST PLANNER
          </span>

          <h2>
            Plan your kitchen
            <br />
            <span>budget with confidence.</span>
          </h2>

        </div>

        <p>
          Choose a few options to get an indicative
          idea of what your kitchen could cost.
        </p>

      </div>


      {/* ==========================================
          MAIN PLANNER
      ========================================== */}

      <div className="cost-planner-box">

        {/* LEFT SIDE */}

        <div className="cost-planner-options">

          {/* ----------------------------------------
              LAYOUT
          ---------------------------------------- */}

          <div className="planner-group">

            <div className="planner-group-heading">

              <span>01</span>

              <div>
                <strong>Kitchen layout</strong>

                <small>
                  Choose the layout that suits your space.
                </small>
              </div>

            </div>


            <div className="layout-options">

              {layoutOptions.map((option) => (

                <button
                  key={option.id}
                  type="button"
                  className={
                    layout === option.id
                      ? "planner-option active"
                      : "planner-option"
                  }
                  onClick={() => setLayout(option.id)}
                >

                  <span className="option-symbol">
                    {option.short}
                  </span>

                  <span className="option-name">
                    {option.name}
                  </span>

                  {layout === option.id && (
                    <span className="option-check">
                      <Check size={12} />
                    </span>
                  )}

                </button>

              ))}

            </div>

          </div>


          {/* ----------------------------------------
              SIZE
          ---------------------------------------- */}

          <div className="planner-group">

            <div className="planner-group-heading">

              <span>02</span>

              <div>
                <strong>Approx. kitchen size</strong>

                <small>
                  Select the closest size for your kitchen.
                </small>
              </div>

            </div>


            <div className="size-options">

              {sizeOptions.map((option) => (

                <button
                  key={option.id}
                  type="button"
                  className={
                    size === option.id
                      ? "size-option active"
                      : "size-option"
                  }
                  onClick={() => setSize(option.id)}
                >

                  <strong>
                    {option.name}
                  </strong>

                  <span>
                    {option.range}
                  </span>

                </button>

              ))}

            </div>

          </div>


          {/* ----------------------------------------
              FINISH
          ---------------------------------------- */}

          <div className="planner-group">

            <div className="planner-group-heading">

              <span>03</span>

              <div>
                <strong>Finish</strong>

                <small>
                  Select the finish you prefer.
                </small>
              </div>

            </div>


            <div className="finish-options">

              {finishOptions.map((option) => (

                <button
                  key={option.id}
                  type="button"
                  className={
                    finish === option.id
                      ? "finish-option active"
                      : "finish-option"
                  }
                  onClick={() => setFinish(option.id)}
                >

                  <span>
                    {option.name}
                  </span>

                  {finish === option.id && (
                    <Check size={13} />
                  )}

                </button>

              ))}

            </div>


            <div className="selected-explanation">

              <Info size={13} />

              <p>
                {selectedFinish.description}
              </p>

            </div>

          </div>


          {/* ----------------------------------------
              HARDWARE
          ---------------------------------------- */}

          <div className="planner-group">

            <div className="planner-group-heading">

              <span>04</span>

              <div>
                <strong>Hardware</strong>

                <small>
                  Choose the level of hardware.
                </small>
              </div>

            </div>


            <div className="hardware-options">

              {hardwareOptions.map((option) => (

                <button
                  key={option.id}
                  type="button"
                  className={
                    hardware === option.id
                      ? "hardware-option active"
                      : "hardware-option"
                  }
                  onClick={() =>
                    setHardware(option.id)
                  }
                >

                  <div>

                    <strong>
                      {option.name}
                    </strong>

                    <span>
                      {option.description}
                    </span>

                  </div>

                  {hardware === option.id && (
                    <Check size={14} />
                  )}

                </button>

              ))}

            </div>

          </div>

        </div>


        {/* ==========================================
            RESULT SIDE
        ========================================== */}

        <div className="cost-planner-result">

          <div className="result-top">

            <span>
              YOUR ESTIMATED RANGE
            </span>

            <div className="result-price">

              <strong>
                {formatLakhs(estimate.lower)}
              </strong>

              <span>—</span>

              <strong>
                {formatLakhs(estimate.upper)}
              </strong>

            </div>

            <p>
              Based on your selected kitchen
              layout, size, finish and hardware.
            </p>

          </div>


          {/* SUMMARY */}

          <div className="result-summary">

            <span>
              YOUR SELECTION
            </span>

            <div className="summary-row">
              <span>Layout</span>
              <strong>{selectedLayout.name}</strong>
            </div>

            <div className="summary-row">
              <span>Size</span>
              <strong>{selectedSize.name}</strong>
            </div>

            <div className="summary-row">
              <span>Finish</span>
              <strong>{selectedFinish.name}</strong>
            </div>

            <div className="summary-row">
              <span>Hardware</span>
              <strong>{selectedHardware.name}</strong>
            </div>

          </div>


          {/* INCLUDED */}

          <div className="result-included">

            <span>
              TYPICALLY INCLUDES
            </span>

            <div className="included-list">

              <span>
                <Check size={12} />
                Cabinets
              </span>

              <span>
                <Check size={12} />
                Shutters
              </span>

              <span>
                <Check size={12} />
                Storage units
              </span>

              <span>
                <Check size={12} />
                Standard installation
              </span>

            </div>

          </div>


          {/* CTA */}

          <a
            href="/contact"
            className="cost-planner-cta"
          >
            Get a personalised estimate

            <ArrowRight size={15} />
          </a>


          {/* NOTE */}

          <p className="cost-planner-note">
            This is an indicative range only. Final
            pricing depends on measurements, selected
            materials, hardware, accessories and
            project requirements.
          </p>

        </div>

      </div>

    </section>
  );
};

export default KitchenCostPlanner;