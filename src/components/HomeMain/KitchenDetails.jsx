import React, { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./KitchenDetails.css";

import kitchenImage from "../../images/kitchen.jpg";

const details = [
  {
    id: 1,
    number: "01",
    title: "Smart Storage",
    description:
      "Tall units, deep drawers and carefully planned storage keep everyday essentials organised without taking over the workspace.",
    position: {
      top: "20%",
      left: "10%",
    },
  },
  {
    id: 2,
    number: "02",
    title: "Premium Materials",
    description:
      "Durable finishes are selected to balance the look you want with the everyday demands of an Indian kitchen.",
    position: {
      top: "59%",
      left: "35%",
    },
  },
  {
    id: 3,
    number: "03",
    title: "Practical Lighting",
    description:
      "Layered lighting keeps the worktop clear and comfortable while adding warmth to the overall space.",
    position: {
      top: "25%",
      left: "70%",
    },
  },
  {
    id: 4,
    number: "04",
    title: "Smooth Hardware",
    description:
      "Soft-close drawers and quality hardware make the kitchen feel better every time you open and close it.",
    position: {
      top: "42%",
      left: "94%",
    },
  },
];

const KitchenDetails = () => {
  const [activeId, setActiveId] = useState(1);

  const navigate = useNavigate();

  const activeDetail = details.find(
    (item) => item.id === activeId
  );

  return (
    <section className="kitchen-details">

      {/* HEADER */}

      <div className="kitchen-details__header">

        <div>
          <span className="kitchen-details__eyebrow">
            LOOK CLOSER
          </span>

          <h2>
            A kitchen is more
            <br />
            <span>than what you see.</span>
          </h2>
        </div>

        <p>
          Explore the small details that make a
          well-designed kitchen work better every day.
        </p>

      </div>

      {/* MAIN IMAGE */}

      <div className="kitchen-details__visual">

        <img
          src={kitchenImage}
          alt="Premium modular kitchen"
        />

        <div className="kitchen-details__shade" />

        {/* HOTSPOTS */}

        {details.map((detail) => (
          <button
            key={detail.id}
            type="button"
            className={`kitchen-details__hotspot ${
              activeId === detail.id
                ? "is-active"
                : ""
            }`}
            style={{
              top: detail.position.top,
              left: detail.position.left,
            }}
            onClick={() => setActiveId(detail.id)}
            aria-label={`Explore ${detail.title}`}
          >
            <span className="kitchen-details__pulse" />

            <span className="kitchen-details__plus">
              <Plus size={15} strokeWidth={1.5} />
            </span>
          </button>
        ))}

        {/* DETAIL CARD */}

        <div className="kitchen-details__card">

          <div className="kitchen-details__card-top">

            <span>
              {activeDetail.number}
            </span>

            <span>
              EXPLORE DETAIL
            </span>

          </div>

          <h3>
            {activeDetail.title}
          </h3>

          <p>
            {activeDetail.description}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/materials")
            }
          >
            Explore materials
            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>

      {/* BOTTOM NAVIGATION */}

      <div className="kitchen-details__navigation">

        {details.map((detail) => (
          <button
            key={detail.id}
            type="button"
            className={
              activeId === detail.id
                ? "is-active"
                : ""
            }
            onClick={() =>
              setActiveId(detail.id)
            }
          >

            <span>
              {detail.number}
            </span>

            <strong>
              {detail.title}
            </strong>

          </button>
        ))}

      </div>

    </section>
  );
};

export default KitchenDetails;