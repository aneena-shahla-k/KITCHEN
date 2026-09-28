import React from "react";
import "./MaterialsCollection.css";

// ================================
// WOOD
// ================================

import woodImage from "../../images/material/wood-main.jpg";

import woodImage1 from "../../images/material/walnut.jpg";
import woodImage2 from "../../images/material/oak.jpg";
import woodImage3 from "../../images/material/ash.jpg";
import woodImage4 from "../../images/material/teak.jpg";
import woodImage5 from "../../images/material/mahogany.jpg";
import woodImage6 from "../../images/material/maple.jpg";
import woodImage7 from "../../images/material/ebonyy.jpg";
import woodImage8 from "../../images/material/smoked-oak.jpg";


// ================================
// GLASS
// ================================

import glassImage from "../../images/material/glass-main.jpg";

import glassImage1 from "../../images/material/clear.jpg";
import glassImage2 from "../../images/material/frosted.jpg";
import glassImage3 from "../../images/material/fluted.jpg";
import glassImage4 from "../../images/material/tinted.jpg";
import glassImage5 from "../../images/material/bronze.jpg";
import glassImage6 from "../../images/material/grey.jpg";
import glassImage7 from "../../images/material/reeded.jpg";
import glassImage8 from "../../images/material/ribbed.jpg";


// ================================
// HARDWARE
// ================================

import hardwareImage from "../../images/material/hardwarepmain.jpg";

import hardwareImage1 from "../../images/material/brasss.jpg";
import hardwareImage2 from "../../images/material/matte-black.jpg";
import hardwareImage3 from "../../images/material/stainless.jpg";
import hardwareImage4 from "../../images/material/chrome.jpg";
import hardwareImage5 from "../../images/material/antuque.jpg";
import hardwareImage6 from "../../images/material/gun.jpg";
import hardwareImage7 from "../../images/material/broze.jpg";
import hardwareImage8 from "../../images/material/champagne.jpg";


// ===============================
// STONE
// ================================

import stoneImage from "../../images/material/stone-main.jpg";

import stoneImage1 from "../../images/material/marble.jpg";
import stoneImage2 from "../../images/material/quartz.jpg";
import stoneImage3 from "../../images/material/granite.jpg";
import stoneImage4 from "../../images/material/traver.jpg";
import stoneImage5 from "../../images/material/calacata.jpg";
import stoneImage6 from "../../images/material/carrara.jpg";
import stoneImage7 from "../../images/material/black-marbl.jpg";
import stoneImage8 from "../../images/material/taj-mahal.jpg";


// ================================
// COLOR PALETTE
// ================================

import colourImage from "../../images/material/colour.jpg";


const MaterialsCollection = () => {

  // =========================================
  // MATERIAL DATA
  // =========================================

  const materials = {

    // -----------------------------------------
    // WOOD
    // -----------------------------------------

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
      {
        name: "Mahogany",
        image: woodImage5,
      },
      {
        name: "Maple",
        image: woodImage6,
      },
      {
        name: "Ebony",
        image: woodImage7,
      },
      {
        name: "Smoked Oak",
        image: woodImage8,
      },
    ],


    // -----------------------------------------
    // GLASS
    // -----------------------------------------

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
      {
        name: "Tinted",
        image: glassImage4,
      },
      {
        name: "Bronze",
        image: glassImage5,
      },
      {
        name: "Grey",
        image: glassImage6,
      },
      {
        name: "Ribbed",
        image: glassImage8,
      },
      {
        name: "Reeded",
        image: glassImage7,
      },
    ],


    // -----------------------------------------
    // HARDWARE
    // -----------------------------------------

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
      {
        name: "Chrome",
        image: hardwareImage4,
      },
      {
        name: "Antique Brass",
        image: hardwareImage5,
      },
      {
        name: "Gunmetal",
        image: hardwareImage6,
      },
      {
        name: "Bronze",
        image: hardwareImage7,
      },
      {
        name: "Champagne",
        image: hardwareImage8,
      },
    ],


    // -----------------------------------------
    // STONE
    // -----------------------------------------

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
      {
        name: "Calacatta",
        image: stoneImage5,
      },
      {
        name: "Carrara",
        image: stoneImage6,
      },
      
      {
        name: "Taj Mahal Quartzite",
        image: stoneImage8,
      },{
        name: "Black Marble",
        image: stoneImage7,
      },
    ],
  };


  // =========================================
  // COLOR PALETTE
  // =========================================

  const colours = [
    {
      name: "Ivory",
      color: "#e9e5db",
    },
    {
      name: "Sand",
      color: "#c9baa3",
    },
    {
      name: "Beige",
      color: "#d1c2ac",
    },
    {
      name: "Taupe",
      color: "#a99885",
    },
    {
      name: "Greige",
      color: "#afa99b",
    },
    {
      name: "Sage",
      color: "#89917d",
    },
    {
      name: "Olive",
      color: "#68715f",
    },
    {
      name: "Forest",
      color: "#3e493f",
    },
    {
      name: "Charcoal",
      color: "#303234",
    },
    {
      name: "Graphite",
      color: "#4b4945",
    },
    {
      name: "Walnut",
      color: "#6d4a30",
    },
    {
      name: "Terracotta",
      color: "#b8623d",
    },
    {
      name: "Clay",
      color: "#b38a72",
    },
    {
      name: "Cream",
      color: "#eee8dd",
    },
    {
      name: "Soft White",
      color: "#e8e5de",
    },
    {
      name: "Black",
      color: "#202122",
    },
  ];


  return (

    <section
      className="materials-collection"
      id="materials"
    >


      {/* =====================================================
          01 — WOOD
      ===================================================== */}

      <article
        className="material-row"
        id="wood"
      >

        {/* 1. MAIN IMAGE */}

        <div className="material-image">

          <img
            src={woodImage}
            alt="Natural wood finishes"
          />

        </div>


        {/* 2. INFORMATION */}

        <div className="material-info">

          <div className="material-number">

            <span>01</span>

            <i></i>

          </div>


          <h2>
            Wood
          </h2>


          <span className="material-count">
            8+ FINISHES
          </span>


          <span className="material-tagline">
            NATURAL WARMTH. LASTING BEAUTY.
          </span>


          <p>
            From rich walnut to light oak, our wood
            finishes bring warmth, texture and timeless
            character to your kitchen.
          </p>
        </div>


        {/* 3. FINISHES */}

        <div className="material-options">

          <div className="material-swatches">

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

                <span>
                  {item.name}
                </span>

              </div>

            ))}

          </div>


          <div className="finish-count">
            <strong>8+</strong>
            <span>FINISHES</span>
          </div>

        </div>

      </article>



      {/* =====================================================
          02 — GLASS
      ===================================================== */}

      <article
        className="material-row"
        id="glass"
      >

        {/* 1. MAIN IMAGE */}

        <div className="material-image">

          <img
            src={glassImage}
            alt="Glass kitchen finishes"
          />

        </div>


        {/* 2. INFORMATION */}

        <div className="material-info">

          <div className="material-number">

            <span>02</span>

            <i></i>

          </div>


          <h2>
            Glass
          </h2>


          <span className="material-count">
            8+ FINISHES
          </span>


          <span className="material-tagline">
            LIGHT. OPEN. ELEGANT.
          </span>


          <p>
            Glass adds depth and light, creating a clean,
            modern look while keeping your space feeling
            open and airy.
          </p>



        </div>


        {/* 3. FINISHES */}

        <div className="material-options">

          <div className="material-swatches">

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

                <span>
                  {item.name}
                </span>

              </div>

            ))}

          </div>


          <div className="finish-count">
            <strong>8+</strong>
            <span>FINISHES</span>
          </div>

        </div>

      </article>



      {/* =====================================================
          03 — HARDWARE
      ===================================================== */}

      <article
        className="material-row"
        id="hardware"
      >

        {/* 1. MAIN IMAGE */}

        <div className="material-image">

          <img
            src={hardwareImage}
            alt="Premium kitchen hardware"
          />

        </div>


        {/* 2. INFORMATION */}

        <div className="material-info">

          <div className="material-number">

            <span>03</span>

            <i></i>

          </div>


          <h2>
            Hardware
          </h2>


          <span className="material-count">
            8+ FINISHES
          </span>


          <span className="material-tagline">
            SMALL DETAILS. BIG DIFFERENCE.
          </span>


          <p>
            Premium hardware adds the perfect finishing
            touch — built for durability, comfort and
            everyday ease.
          </p>
        </div>


        {/* 3. FINISHES */}

        <div className="material-options">

          <div className="material-swatches">

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

                <span>
                  {item.name}
                </span>

              </div>

            ))}

          </div>


          <div className="finish-count">
            <strong>8+</strong>
            <span>FINISHES</span>
          </div>

        </div>

      </article>



      {/* =====================================================
          04 — STONE
      ===================================================== */}

      <article
        className="material-row"
        id="stone"
      >

        {/* 1. MAIN IMAGE */}

        <div className="material-image">

          <img
            src={stoneImage}
            alt="Stone kitchen countertop"
          />

        </div>


        {/* 2. INFORMATION */}

        <div className="material-info">

          <div className="material-number">

            <span>04</span>

            <i></i>

          </div>


          <h2>
            Stone
          </h2>


          <span className="material-count">
            8+ FINISHES
          </span>


          <span className="material-tagline">
            TIMELESS. DURABLE. NATURAL.
          </span>


          <p>
            From elegant marble to rugged quartz, our
            stone surfaces bring strength and
            sophistication to your space.
          </p>

        </div>


        {/* 3. FINISHES */}

        <div className="material-options">

          <div className="material-swatches">

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

                <span>
                  {item.name}
                </span>

              </div>

            ))}

          </div>


          <div className="finish-count">
            <strong>8+</strong>
            <span>FINISHES</span>
          </div>

        </div>

      </article>



      {/* =====================================================
          05 — COLOR PALETTE
      ===================================================== */}

      <article
        className="material-row colour-row"
        id="colours"
      >

        {/* 1. MAIN IMAGE */}

        <div className="material-image">

          <img
            src={colourImage}
            alt="Kitchen colour palette"
          />

        </div>


        {/* 2. INFORMATION */}

        <div className="material-info">

          <div className="material-number">

            <span>05</span>

            <i></i>

          </div>


          <h2>
            Color Palette
          </h2>


          <span className="material-count">
            16+ COLOURS
          </span>


          <span className="material-tagline">
            CALM TONES. LASTING STYLE.
          </span>


          <p>
            A curated palette of colours to create a
            kitchen that feels balanced, modern
            and uniquely yours.
          </p>


        </div>


        {/* 3. COLOR OPTIONS */}

        <div className="material-options colour-options">

          <div className="colour-swatches">

            {colours.map((colour) => (

              <div
                className="colour-swatch"
                key={colour.name}
              >

                <div
                  className="colour-circle"
                  style={{
                    backgroundColor: colour.color,
                  }}
                />

                <span>
                  {colour.name}
                </span>

              </div>

            ))}

          </div>


          <div className="finish-count">
            <strong>16+</strong>
            <span>COLOURS</span>
          </div>

        </div>

      </article>


    </section>
  );
};


export default MaterialsCollection;