import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
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
    description: "Warm, organic and naturally inviting.",
    colors: ["#9b7658", "#d4c0a5", "#81705e", "#b39a7d"],
  },
  {
    name: "PURE",
    description: "Soft neutrals with a quiet architectural feel.",
    colors: ["#e8dac1", "#cfc8bb", "#a99f91", "#f3efe8"],
  },
  {
    name: "MOODY",
    description: "Deep tones for a more dramatic kitchen.",
    colors: ["#302d29", "#5a5148", "#80766b", "#191817"],
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
          <img src={img1} alt={material.label} />
        </div>

        <div className="materialStudio-hero-overlay" />

        <div className="materialStudio-hero-content">
          <h1>
            Made of
            <br />
            <em>the details.</em>
          </h1>

          <p>
            Explore the textures, finishes and materials
            that give every kitchen its own character.
          </p>

          <a href="#material-explorer" className="materialStudio-scroll">
            Explore materials
            <ArrowUpRight size={15} />
          </a>

        </div>

      </section>


      {/* MATERIAL EXPLORER */}

      <section
        className="materialStudio-explorer"
        id="material-explorer"
      >

        <div className="materialStudio-section-heading">
          <h2>
            Touch the
            <em> surface.</em>
          </h2>

          <p>
            Every material changes the atmosphere of a kitchen.
            Choose one to explore its character.
          </p>

        </div>


        <div className="materialStudio-explorer-grid">

          {/* BIG MATERIAL */}

          <div className="materialStudio-material-card">

            <img
              key={material.id}
              src={material.image}
              alt={material.label}
            />

            <div className="materialStudio-material-gradient" />

            <div className="materialStudio-material-top">
              <span>SELECTED MATERIAL</span>
              <span>
                0{activeMaterial + 1} / 04
              </span>
            </div>

            <div className="materialStudio-material-bottom">

              <span>{material.label}</span>

              <h3>
                {material.title}
              </h3>

            </div>

          </div>


          {/* MATERIAL NAVIGATION */}

          <div className="materialStudio-material-navigation">

            <span className="materialStudio-small-label">
              EXPLORE
            </span>

            {materialGroups.map((item, index) => (

              <button
                key={item.id}
                type="button"
                className={
                  activeMaterial === index
                    ? "materialStudio-nav-item active"
                    : "materialStudio-nav-item"
                }
                onClick={() => setActiveMaterial(index)}
              >

                <span>
                  0{index + 1}
                </span>

                <strong>
                  {item.label}
                </strong>

                <ArrowUpRight size={15} />

              </button>

            ))}

            <div className="materialStudio-description">

              <p>
                {material.description}
              </p>

              <div className="materialStudio-details">

                {material.details.map((detail) => (

                  <div key={detail}>
                    <Check size={13} />
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

        <div className="materialStudio-palette-heading">

          <span>DESIGN PALETTES</span>

          <h2>
            A palette for
            <br />
            <em>your kitchen.</em>
          </h2>

        </div>


        <div className="materialStudio-palette-content">

          <div className="materialStudio-palette-visual">

            <div className="materialStudio-palette-orbit">

              {palette.colors.map((color, index) => (

                <span
                  key={index}
                  className="materialStudio-swatch"
                  style={{ background: color }}
                />

              ))}

            </div>

            <div className="materialStudio-palette-center">
              <span>PALETTE</span>
              <strong>{palette.name}</strong>
            </div>

          </div>


          <div className="materialStudio-palette-copy">

            <span className="materialStudio-small-label">
              SELECT A MOOD
            </span>

            {palettes.map((item, index) => (

              <button
                key={item.name}
                type="button"
                className={
                  activePalette === index
                    ? "materialStudio-palette-option active"
                    : "materialStudio-palette-option"
                }
                onClick={() => setActivePalette(index)}
              >

                <span>0{index + 1}</span>

                <strong>{item.name}</strong>

                <ArrowUpRight size={15} />

              </button>

            ))}

            <p>
              {palette.description}
            </p>

          </div>

        </div>

      </section>


      {/* MATERIAL STORY */}

      <section className="materialStudio-story">

        <div className="materialStudio-story-image">
          <img src={stone} alt="Stone kitchen material" />
        </div>

        <div className="materialStudio-story-content">

          <span>MATERIAL STORY</span>

          <h2>
            From raw
            <br />
            <em>to refined.</em>
          </h2>

          <p>
            Great kitchens aren't created from a single material.
            They come from the balance between texture, colour,
            light and craftsmanship.
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


      {/* DETAILS */}

      <section className="materialStudio-details-section">
        <div className="materialStudio-details-header">
          <h2>
            Beautiful
            <em> up close.</em>
          </h2>
        </div>
        <div className="materialStudio-detail-grid">
          <div className="materialStudio-detail-card">
            <img src={img1} alt="Wood texture" />
            <span>01</span>
            <h3>Natural grain</h3>
            <p>Texture that gives the kitchen warmth.</p>
          </div>

          <div className="materialStudio-detail-card">
            <img src={img2} alt="Stone surface" />
            <span>02</span>
            <h3>Stone character</h3>
            <p>Subtle variation makes every surface unique.</p>
          </div>

          <div className="materialStudio-detail-card">
            <img src={img3} alt="Kitchen hardware" />
            <span>03</span>
            <h3>Fine hardware</h3>
            <p>Small details designed for everyday movement.</p>
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
        
          <p>
            Tell us what you imagine.
            We'll help you find the right combination.
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