import React, { useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import "./MaterialsPage.css";

import wood from "../../images/material/wood1.jpg";
import stone from "../../images/material/stone2.jpg";
import glass from "../../images/material/glass2.jpg";
import hardware from "../../images/material/finehard.jpg";
import img1 from "../../images/material/naturalgrain.jpg";
import img2 from "../../images/material/stonechar.jpg";
import img3 from "../../images/material/finehard.jpg";

const materialGroups = [
  {
    id: "wood",
    label: "WOOD",
    title: "Warmth you can feel.",
    description:
      "Natural textures and warm tones bring character, depth and a welcoming feeling to your kitchen.",
    image: wood,
    details: ["Natural grain", "Warm character", "Timeless finish"],
  },
  {
    id: "stone",
    label: "STONE",
    title: "Quiet luxury, carved in.",
    description:
      "Elegant stone and quartz surfaces create a refined foundation designed to handle everyday living.",
    image: stone,
    details: ["Durable surface", "Refined texture", "Easy to maintain"],
  },
  {
    id: "glass",
    label: "GLASS",
    title: "Light changes everything.",
    description:
      "Glass introduces lightness and visual depth while keeping the overall kitchen feeling clean and contemporary.",
    image: glass,
    details: ["Visual depth", "Light reflection", "Modern character"],
  },
  {
    id: "hardware",
    label: "HARDWARE",
    title: "The details you feel.",
    description:
      "Thoughtfully selected hardware makes every opening, closing and movement feel effortless.",
    image: hardware,
    details: ["Smooth movement", "Precise fittings", "Everyday comfort"],
  },
];

const palettes = [
  {
    name: "EARTH",
    subtitle: "Organic & Inviting",
    description: "Warm, organic tones with natural grain and soft earth character.",
    colors: ["#9b7658", "#d4c0a5", "#81705e", "#b39a7d"],
    tags: ["Natural Wood", "Matte Texture", "Warm Light"],
  },
  {
    name: "PURE",
    subtitle: "Quiet & Architectural",
    description: "Soft neutrals layered with clean ivory and subtle ceramic undertones.",
    colors: ["#e8dac1", "#cfc8bb", "#a99f91", "#f3efe8"],
    tags: ["Minimalist", "PU Finish", "Airy Flow"],
  },
  {
    name: "MOODY",
    subtitle: "Deep & Refined",
    description: "Rich slate and charcoal tones for a bolder, high-contrast presence.",
    colors: ["#302d29", "#5a5148", "#80766b", "#191817"],
    tags: ["Smoked Oak", "Fluted Glass", "Bold Accent"],
  },
];

const MaterialsPage = () => {
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activePalette, setActivePalette] = useState(0);

  const material = materialGroups[activeMaterial];
  const palette = palettes[activePalette];

  return (
    <main className="materialStudio">
      {/* HERO */}
      <section className="materialStudio-hero">
        <div className="materialStudio-hero-image">
          <img src={img1} alt="Material Studio Hero" />
        </div>

        <div className="materialStudio-hero-overlay" />

        <div className="materialStudio-hero-content">
          <span className="materialStudio-eyebrow">THE MATERIAL STUDIO</span>
          <h1>
            Made of
            <br />
            <em>the details.</em>
          </h1>

          <p>
            Explore the textures, finishes and materials that give every kitchen
            its own character.
          </p>

          <a href="#material-explorer" className="materialStudio-scroll">
            Explore materials
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {/* MATERIAL EXPLORER */}
      <section className="materialStudio-explorer" id="material-explorer">
        <div className="materialStudio-section-heading">
          <div>
            <span className="materialStudio-small-label">SURFACE EXPLORER</span>
            <h2>
              Touch the
              <br />
              <span>surface.</span>
            </h2>
          </div>

          <p>
            Every material changes the atmosphere of a kitchen. Choose one to
            explore its character.
          </p>
        </div>

        <div className="materialStudio-explorer-grid">
          {/* MATERIAL DISPLAY */}
          <div className="materialStudio-material-card">
            <img key={material.id} src={material.image} alt={material.label} />
            <div className="materialStudio-material-gradient" />

            <div className="materialStudio-material-top">
              <span>SELECTED MATERIAL</span>
              <span>0{activeMaterial + 1} / 04</span>
            </div>

            <div className="materialStudio-material-bottom">
              <span>{material.label}</span>
              <h3>{material.title}</h3>
            </div>
          </div>

          {/* MATERIAL NAVIGATION */}
          <div className="materialStudio-material-navigation">
            <span className="materialStudio-small-label">SELECT A FINISH</span>

            <div className="materialStudio-nav-list">
              {materialGroups.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`materialStudio-nav-item ${
                    activeMaterial === index ? "active" : ""
                  }`}
                  onClick={() => setActiveMaterial(index)}
                >
                  <span className="nav-index">0{index + 1}</span>
                  <strong>{item.label}</strong>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>

            <div className="materialStudio-description">
              <p>{material.description}</p>
              <div className="materialStudio-details">
                {material.details.map((detail) => (
                  <div key={detail}>
                    <Check size={14} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PALETTE SECTION */}
      <section className="materialStudio-palettes">
        <div className="materialStudio-palette-container">
          <div className="materialStudio-palette-heading">
            <div>
              <span className="materialStudio-small-label">
                <Sparkles size={13} />
                CURATED HARMONIES
              </span>
              <h2>
                A palette for
                <br />
                <span>your kitchen mood.</span>
              </h2>
            </div>
            <p>
              Color and texture set the tone for everyday living. Explore
              curated finishes designed to feel balanced together.
            </p>
          </div>

          <div className="materialStudio-palette-content">
            {/* SWATCH CARDS */}
            <div className="materialStudio-palette-visual">
              <div className="materialStudio-swatch-grid">
                {palette.colors.map((color, index) => (
                  <div
                    key={`${palette.name}-${index}`}
                    className="materialStudio-swatch-card"
                    style={{
                      backgroundColor: color,
                      "--delay": `${index * 0.08}s`,
                    }}
                  >
                    <span className="materialStudio-swatch-code">{color}</span>
                  </div>
                ))}
              </div>

              <div className="materialStudio-palette-badge">
                <span>ACTIVE PALETTE</span>
                <strong>{palette.name}</strong>
              </div>
            </div>

            {/* SELECTION LIST */}
            <div className="materialStudio-palette-copy">
              <span className="materialStudio-small-label">SELECT A MOOD</span>

              <div className="materialStudio-palette-list">
                {palettes.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`materialStudio-palette-option ${
                      activePalette === index ? "active" : ""
                    }`}
                    onClick={() => setActivePalette(index)}
                  >
                    <span className="option-index">0{index + 1}</span>
                    <div className="option-text">
                      <strong>{item.name}</strong>
                      <small>{item.subtitle}</small>
                    </div>
                    <div className="option-mini-preview">
                      {item.colors.map((c, i) => (
                        <span key={i} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>

              <div className="materialStudio-palette-meta">
                <p>{palette.description}</p>
                <div className="materialStudio-palette-tags">
                  {palette.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIAL STORY */}
      <section className="materialStudio-story">
        <div className="materialStudio-story-image">
          <img src={stone} alt="Stone kitchen material" />
        </div>

        <div className="materialStudio-story-content">
          <span className="materialStudio-small-label">MATERIAL STORY</span>
          <h2>
            From raw
            <br />
            <span>to refined.</span>
          </h2>
          <p>
            Great kitchens aren't created from a single material. They come from
            the balance between texture, colour, light and craftsmanship.
          </p>

          <div className="materialStudio-story-steps">
            <div>
              <span>01</span>
              <strong>SELECT</strong>
              <p>Choose materials with purpose.</p>
            </div>
            <div>
              <span>02</span>
              <strong>CRAFT</strong>
              <p>Shape every surface precisely.</p>
            </div>
            <div>
              <span>03</span>
              <strong>LIVE</strong>
              <p>Enjoy them every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="materialStudio-details-section">
        <div className="materialStudio-details-header">
          <div>
            <span className="materialStudio-small-label">CLOSE UP</span>
            <h2>
              Beautiful
              <br />
              <span>up close.</span>
            </h2>
          </div>
        </div>

        <div className="materialStudio-detail-grid">
          <div className="materialStudio-detail-card">
            <img src={img1} alt="Wood texture" />
            <div className="materialStudio-detail-overlay">
              <span>01</span>
              <div>
                <h3>Natural grain</h3>
                <p>Texture that gives the kitchen warmth.</p>
              </div>
            </div>
          </div>

          <div className="materialStudio-detail-card">
            <img src={img2} alt="Stone surface" />
            <div className="materialStudio-detail-overlay">
              <span>02</span>
              <div>
                <h3>Stone character</h3>
                <p>Subtle variation makes every surface unique.</p>
              </div>
            </div>
          </div>

          <div className="materialStudio-detail-card">
            <img src={img3} alt="Kitchen hardware" />
            <div className="materialStudio-detail-overlay">
              <span>03</span>
              <div>
                <h3>Fine hardware</h3>
                <p>Small details designed for everyday movement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="materialStudio-cta">
        <div className="materialStudio-cta-image">
          <img src={wood} alt="Kitchen material" />
        </div>
        <div className="materialStudio-cta-overlay" />
        <div className="materialStudio-cta-content">
          <h2>
            Plan your finishes
            <br />
            <span>with our design team.</span>
          </h2>
          <p>
            Tell us what you imagine. We'll help you find the right combination
            for your home.
          </p>
          <a href="/contact">
            Talk to a designer
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default MaterialsPage;