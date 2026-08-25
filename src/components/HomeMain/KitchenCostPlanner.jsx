import React, { useMemo, useState } from "react";
import { ArrowRight, Check, Info, ChevronDown } from "lucide-react";
import "./kitchenCostPlanner.css";

const layoutOptions = [
  { id: "lshape", name: "L-Shape", short: "L", multiplier: 1 },
  { id: "ushape", name: "U-Shape", short: "U", multiplier: 1.18 },
  { id: "parallel", name: "Parallel", short: "II", multiplier: 1.08 },
  { id: "island", name: "Island", short: "I", multiplier: 1.3 },
];

const finishOptions = [
  {
    id: "laminate",
    name: "Laminate (Matte / Gloss)",
    multiplier: 0.9,
    description: "Practical, durable, scratch-resistant and budget-friendly.",
  },
  {
    id: "anti-fingerprint",
    name: "Anti-Fingerprint / Super Matte",
    multiplier: 1.05,
    description: "Smooth silky finish resistant to smudges and fingerprints.",
  },
  {
    id: "acrylic",
    name: "High-Gloss Acrylic",
    multiplier: 1.15,
    description: "Ultra-glossy, mirror-like finish for a sleek modern look.",
  },
  {
    id: "pu",
    name: "PU Lacquer (Polyurethane)",
    multiplier: 1.25,
    description: "Seamless painted finish with superior moisture resistance.",
  },
  {
    id: "veneer",
    name: "Natural Wood Veneer",
    multiplier: 1.32,
    description: "Authentic wood grain bringing warmth and timeless luxury.",
  },
  {
    id: "ceramic-glass",
    name: "Back-Painted / Ceramic Glass",
    multiplier: 1.45,
    description: "Ultra-premium, scratchproof and highly heat resistant.",
  },
];

const hardwareOptions = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1,
    description: "Reliable everyday hardware for regular kitchen use.",
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.18,
    description: "Enhanced hardware with smoother movement and soft closing.",
  },
];

const BASE_RATE_PER_SQFT = 3800;

const formatLakhs = (value) => {
  return `₹${(value / 100000).toFixed(1)}L`;
};

const KitchenCostPlanner = () => {
  const [layout, setLayout] = useState("lshape");
  const [sqft, setSqft] = useState(80);
  const [finish, setFinish] = useState("acrylic");
  const [hardware, setHardware] = useState("premium");

  const selectedLayout = layoutOptions.find((item) => item.id === layout);
  const selectedFinish = finishOptions.find((item) => item.id === finish);
  const selectedHardware = hardwareOptions.find((item) => item.id === hardware);

  const handleSqftChange = (e) => {
    const val = Number(e.target.value);
    if (val >= 0) setSqft(val);
  };

  const estimate = useMemo(() => {
    const validSqft = sqft > 0 ? sqft : 60;
    const base =
      validSqft *
      BASE_RATE_PER_SQFT *
      selectedLayout.multiplier *
      selectedFinish.multiplier *
      selectedHardware.multiplier;

    const lower = Math.round(base / 10000) * 10000;
    const upper = Math.round((base * 1.3) / 10000) * 10000;

    return { lower, upper };
  }, [sqft, selectedLayout, selectedFinish, selectedHardware]);

  return (
    <section className="kitchen-cost-planner">
      <div className="cost-planner-header">
        <div>
          <span className="cost-planner-label">KITCHEN COST PLANNER</span>
          <h2>
            Plan your kitchen
            <br />
            <span>budget with confidence.</span>
          </h2>
        </div>
        <p>
          Choose your layout, enter dimensions, and customize materials for an
          indicative price range.
        </p>
      </div>

      <div className="cost-planner-box">
        {/* LEFT SIDE */}
        <div className="cost-planner-options">
          {/* 01. LAYOUT */}
          <div className="planner-group">
            <div className="planner-group-heading">
              <span>01</span>
              <div>
                <strong>Kitchen layout</strong>
                <small>Choose the layout that suits your space.</small>
              </div>
            </div>

            <div className="layout-options">
              {layoutOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`planner-option ${
                    layout === option.id ? "active" : ""
                  }`}
                  onClick={() => setLayout(option.id)}
                >
                  <span className="option-symbol">{option.short}</span>
                  <span className="option-name">{option.name}</span>
                  {layout === option.id && (
                    <span className="option-check">
                      <Check size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 02 & 03. SIZE & FINISH (SAME ROW) */}
          <div className="planner-row-grid">
            {/* 02. SIZE */}
            <div className="planner-group">
              <div className="planner-group-heading">
                <span>02</span>
                <div>
                  <strong>Kitchen size (sq.ft)</strong>
                  <small>Enter room floor/carpet area.</small>
                </div>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  min="20"
                  max="1000"
                  value={sqft || ""}
                  onChange={handleSqftChange}
                  placeholder="e.g. 80"
                  className="sqft-input"
                />
                <span className="input-unit">sq.ft</span>
              </div>
            </div>

            {/* 03. FINISH */}
            <div className="planner-group">
              <div className="planner-group-heading">
                <span>03</span>
                <div>
                  <strong>Cabinet Finish</strong>
                  <small>Select shutter finish.</small>
                </div>
              </div>

              <div className="dropdown-wrapper">
                <select
                  className="custom-select"
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                >
                  {finishOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="dropdown-icon" />
              </div>

              <div className="selected-explanation">
                <Info size={14} />
                <p>{selectedFinish?.description}</p>
              </div>
            </div>
          </div>

          {/* 04. HARDWARE */}
          <div className="planner-group">
            <div className="planner-group-heading">
              <span>04</span>
              <div>
                <strong>Hardware & Fittings</strong>
                <small>Choose the level of hinges & channels.</small>
              </div>
            </div>

            <div className="hardware-options">
              {hardwareOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`hardware-option ${
                    hardware === option.id ? "active" : ""
                  }`}
                  onClick={() => setHardware(option.id)}
                >
                  <div>
                    <strong>{option.name}</strong>
                    <span>{option.description}</span>
                  </div>
                  {hardware === option.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: RESULT */}
        <div className="cost-planner-result">
          <div className="result-top">
            <span>YOUR ESTIMATED RANGE</span>
            <div className="result-price">
              <strong>{formatLakhs(estimate.lower)}</strong>
              <span>—</span>
              <strong>{formatLakhs(estimate.upper)}</strong>
            </div>
            <p>
              Based on {sqft || 0} sq.ft area, {selectedLayout.name} layout,{" "}
              {selectedFinish.name} and {selectedHardware.name} fittings.
            </p>
          </div>

          <div className="result-summary">
            <span>YOUR SELECTION</span>
            <div className="summary-row">
              <span>Layout</span>
              <strong>{selectedLayout.name}</strong>
            </div>
            <div className="summary-row">
              <span>Size</span>
              <strong>{sqft || 0} sq.ft</strong>
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

          <div className="result-included">
            <span>TYPICALLY INCLUDES</span>
            <div className="included-list">
              <span><Check size={12} /> Base & Wall Cabinets</span>
              <span><Check size={12} /> Soft-close Hinges</span>
              <span><Check size={12} /> Drawers & Cutlery Tray</span>
              <span><Check size={12} /> Delivery & Installation</span>
            </div>
          </div>

          <a href="/contact" className="cost-planner-cta">
            Get a personalised estimate
            <ArrowRight size={15} />
          </a>

          <p className="cost-planner-note">
            *Indicative pricing only. Final cost will vary according to on-site
            measurements, internal accessories, and countertop selection.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KitchenCostPlanner;