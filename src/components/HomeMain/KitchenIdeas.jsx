import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./KitchenIdeas.css";

import smallSpace from "../../images/projects/IMG_8260.jpg";
import familyKitchen from "../../images/projects/IMG_8270.jpg";
import compactKitchen from "../../images/projects/IMG_8265.jpg";
import openPlan from "../../images/projects/IMG_8264.jpg";

const ideas = [
  {
    id: "small",
    number: "01",
    label: "SMALL SPACE",
    title: "Make a small kitchen work harder.",
    description:
      "Smart storage and thoughtful layouts that make compact spaces feel open and practical.",
    image: smallSpace,
  },
  {
    id: "family",
    number: "02",
    label: "FAMILY",
    title: "Room for everyone.",
    description:
      "Comfortable layouts with generous storage for busy everyday family life.",
    image: familyKitchen,
  },
  {
    id: "compact",
    number: "03",
    label: "COMPACT",
    title: "Every corner has a purpose.",
    description:
      "Efficient solutions designed to make the most of every available space.",
    image: compactKitchen,
  },
  {
    id: "open-plan",
    number: "04",
    label: "OPEN PLAN",
    title: "A kitchen that connects.",
    description:
      "Designed to flow naturally into your dining and living spaces.",
    image: openPlan,
  },
];

const KitchenIdeas = () => {
  const navigate = useNavigate();

  const openIdea = (id) => {
    navigate(`/kitchens?space=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="kitchen-ideas">
      {/* HEADER */}
      <div className="kitchen-ideas__header">
        <div>
          <span className="kitchen-ideas__eyebrow">FIND YOUR FIT</span>
          <h2>
            Kitchen ideas
            <br />
            <span>for every space.</span>
          </h2>
        </div>

        <p>
          Whether your kitchen is compact, spacious or connected to your living
          area, explore ideas designed around the way you live.
        </p>
      </div>

      {/* GRID */}
      <div className="kitchen-ideas__grid">
        {ideas.map((idea) => (
          <button
            key={idea.id}
            type="button"
            className="kitchen-ideas__item"
            onClick={() => openIdea(idea.id)}
          >
            {/* IMAGE */}
            <div className="kitchen-ideas__image">
              <img src={idea.image} alt={idea.title} loading="lazy" />
              <div className="kitchen-ideas__image-overlay" />
              <span className="kitchen-ideas__number">{idea.number}</span>
              <span className="kitchen-ideas__arrow">
                <ArrowUpRight size={18} />
              </span>
            </div>

            {/* CONTENT */}
            <div className="kitchen-ideas__content">
              <span>{idea.label}</span>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="kitchen-ideas__footer">
        <span>EXPLORE MORE POSSIBILITIES</span>
        <button type="button" onClick={() => navigate("/kitchens")}>
          View all kitchens
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
};

export default KitchenIdeas;