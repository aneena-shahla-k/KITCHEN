import React from "react";
import "./MaterialsCollection.css";

import woodImage1 from "../../images/material/walnut.jpg";
import woodImage from "../../images/material/wood1.jpg";
import woodImage2 from "../../images/material/oak.jpg";
import woodImage3 from "../../images/material/ash.jpg";
import woodImage4 from "../../images/material/teak.jpg";
import glassImage from "../../images/material/glass2.jpg";
import glassImage1 from "../../images/material/clear.jpg";
import glassImage2 from "../../images/material/frosted.jpg";
import glassImage3 from "../../images/material/fluted.jpg";
import hardwareImage from "../../images/hardware.jpg";
import hardwareImage1 from "../../images/material/barss.jpg";
import hardwareImage2 from "../../images/material/black.jpg";
import hardwareImage3 from "../../images/material/stainless.jpg";
import stoneImage from "../../images/material/stone2.jpg";
import stoneImage1 from "../../images/material/marble.jpg";
import stoneImage2 from "../../images/material/quartz.jpg";
import stoneImage3 from "../../images/material/granite.jpg";
import stoneImage4 from "../../images/material/traver.jpg";
import colourImage from "../../images/material/colour.jpg";

const MaterialsCollection = () => {
  const materials = {
    wood: [
      {
        name: "Walnut",
        image: woodImage1,
      },
      {
        name: "Oak",
        image: woodImage2,
      },
      {
        name: "Ash",
        image: woodImage3,
      },
      {
        name: "Teak",
        image: woodImage4,
      },
    ],

    glass: [
      {
        name: "Clear",
        image: glassImage1,
      },
      {
        name: "Frosted",
        image: glassImage2,
      },
      {
        name: "Fluted",
        image: glassImage3,
      },
    ],

    hardware: [
      {
        name: "Brass",
        image: hardwareImage1,
      },
      {
        name: "Matte Black",
        image: hardwareImage2,
      },
      {
        name: "Stainless",
        image: hardwareImage3,
      },
    ],

    stone: [
      {
        name: "Marble",
        image: stoneImage1,
      },
      {
        name: "Quartz",
        image: stoneImage2,
      },
      {
        name: "Granite",
        image: stoneImage3,
      },
      {
        name: "Travertine",
        image: stoneImage4,
      },
    ],
  };

  const colours = [
    "#e9e6dd",
    "#b9ad99",
    "#8a907e",
    "#465044",
    "#71533b",
  ];

  return (
    <section className="materials-collection" id="materials">
      <article className="material-row wood-row" id="wood">
        <div className="material-image">
          <img
            src={woodImage}
            alt="Natural wood finishes"
          />
        </div>
        <div className="material-info">
          <div className="material-number">
            <span>01</span>
            <i></i>
          </div>
          <h2>Wood</h2>
          <span className="material-tagline">
            NATURAL WARMTH. LASTING BEAUTY.
          </span>
          <p>
            From rich walnut to light oak, our wood
            finishes bring warmth, texture and timeless
            character to your kitchen.
          </p>
        </div>
        <div className="material-swatches wood-swatches">
          {materials.wood.map((item) => (
            <div
              className="material-swatch"
              key={item.name}
            >
              <div className="swatch-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <span>{item.name}</span>
            </div>
          ))}

        </div>

      </article>


      {/* =========================================
          GLASS
      ========================================= */}

      <article
        className="material-row glass-row"
        id="glass"
      >

        <div className="material-info">

          <div className="material-number">
            <span>02</span>
            <i></i>
          </div>

          <h2>Glass</h2>

          <span className="material-tagline">
            LIGHT. OPEN. ELEGANT.
          </span>

          <p>
            Glass adds depth and light, creating a clean,
            modern look while keeping your space feeling
            open and airy.
          </p>

        </div>

        <div className="material-image">
          <img
            src={glassImage}
            alt="Glass kitchen finishes"
          />
        </div>

        <div className="material-swatches glass-swatches">

          {materials.glass.map((item) => (
            <div
              className="material-swatch"
              key={item.name}
            >
              <div className="swatch-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <span>{item.name}</span>
            </div>
          ))}

        </div>

      </article>


      {/* =========================================
          HARDWARE
      ========================================= */}

      <article
        className="material-row hardware-row"
        id="hardware"
      >

        <div className="material-image">
          <img
            src={hardwareImage}
            alt="Premium kitchen hardware"
          />
        </div>

        <div className="material-info">

          <div className="material-number">
            <span>03</span>
            <i></i>
          </div>

          <h2>Hardware</h2>

          <span className="material-tagline">
            SMALL DETAILS. BIG DIFFERENCE.
          </span>

          <p>
            Premium hardware adds the perfect finishing
            touch — built for durability, comfort and
            everyday ease.
          </p>

        </div>

        <div className="material-swatches hardware-swatches">

          {materials.hardware.map((item) => (
            <div
              className="material-swatch"
              key={item.name}
            >
              <div className="swatch-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <span>{item.name}</span>
            </div>
          ))}

        </div>

      </article>


      {/* =========================================
          STONE
      ========================================= */}

      <article
        className="material-row stone-row"
        id="stone"
      >

        <div className="material-info">

          <div className="material-number">
            <span>04</span>
            <i></i>
          </div>

          <h2>Stone</h2>

          <span className="material-tagline">
            TIMELESS. DURABLE. NATURAL.
          </span>

          <p>
            From elegant marble to rugged quartz, our
            stone surfaces bring strength and
            sophistication to your space.
          </p>

        </div>

        <div className="material-image">
          <img
            src={stoneImage}
            alt="Stone kitchen countertop"
          />
        </div>

        <div className="material-swatches stone-swatches">

          {materials.stone.map((item) => (
            <div
              className="material-swatch"
              key={item.name}
            >
              <div className="swatch-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <span>{item.name}</span>
            </div>
          ))}

        </div>

      </article>


      {/* =========================================
          COLOUR PALETTE
      ========================================= */}

      <article
        className="material-row colour-row"
        id="colours"
      >

        <div className="material-image colour-image">
          <img
            src={colourImage}
            alt="Kitchen colour palette"
          />
        </div>

        <div className="material-info">

          <div className="material-number">
            <span>05</span>
            <i></i>
          </div>

          <h2>Color Palette</h2>

          <span className="material-tagline">
            CALM TONES. LASTING STYLE.
          </span>

          <p>
            A curated palette of colours to create a
            kitchen that feels balanced, modern
            and uniquely yours.
          </p>

        </div>

        <div className="colour-swatches">

          {colours.map((colour, index) => (
            <div
              className="colour-circle"
              key={index}
              style={{
                backgroundColor: colour,
              }}
            />
          ))}

        </div>

      </article>

    </section>
  );
};

export default MaterialsCollection;