import React, { useState } from "react";
import { Star, BadgeCheck, ArrowLeft, ArrowRight } from "lucide-react";
import "../../styles/HomeStyles/kitchenTestimonials.css";

const testimonialsData = [
  {
    id: "1",
    name: "Ananya & Rahul",
    role: "Full Kitchen Renovation",
    location: "Kochi, Kerala",
    rating: 5,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    kitchenThumb:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80",
    quote:
      "We were able to understand exactly how our kitchen would look before the work started. The design process was simple, and the final result matched our expectations completely.",
  },
  {
    id: "2",
    name: "Dr. Deepak Nair",
    role: "3D Modular Makeover",
    location: "Calicut, Kerala",
    rating: 5,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    kitchenThumb:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    quote:
      "The transparency in pricing and materials was what won us over. No surprise costs, millimeter-accurate installation, and the soft-close fittings feel truly premium.",
  },
  {
    id: "3",
    name: "Fathima & Shameer",
    role: "Apartment Kitchen Upgrade",
    location: "Trivandrum, Kerala",
    rating: 5,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    kitchenThumb:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=500&q=80",
    quote:
      "From laser measurement to the final handover, the timeline was followed strictly. The smart corner storage and tall units doubled our usable space without clutter.",
  },
  {
    id: "4",
    name: "Suresh Menon",
    role: "Contemporary Villa Kitchen",
    location: "Thrissur, Kerala",
    rating: 5,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    kitchenThumb:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80",
    quote:
      "The 3D visualization matched the finished space down to the warm concealed profile lighting. Truly an effortless and stress-free journey.",
  },
];

const KitchenTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  // Helper to determine relative position for the 3 visible slots
  const getSlotData = (offset) => {
    const len = testimonialsData.length;
    const targetIdx = (currentIndex + offset + len) % len;
    return testimonialsData[targetIdx];
  };

  const leftItem = getSlotData(-1);
  const centerItem = getSlotData(0);
  const rightItem = getSlotData(1);

  return (
    <section className="testimonials-parallax-section" id="testimonials">
      {/* BACKGROUND IMAGE WITH MOODY KITCHEN DARKENER OVERLAY */}
      <div className="section-bg-image" />
      <div className="section-bg-overlay" />

      {/* FLOATING WHITE CANVAS CONTAINER */}
      <div className="testimonials-floating-box">
        <div className="box-header">
          <span className="box-eyebrow">WHAT HOMEOWNERS ARE SAYING</span>
          <h2>Loved by Families Across Kerala</h2>
        </div>

        {/* 3-COLUMN CAROUSEL ROW */}
        <div className="carousel-track-wrapper">
          {/* 1. LEFT CARD (Faded) */}
          <div className="testimonial-slot side-slot left-slot" onClick={prevSlide}>
            <div className="avatar-wrap">
              <img src={leftItem.avatar} alt={leftItem.name} />
            </div>
            <h4>{leftItem.name}</h4>
            <p className="slot-quote">“{leftItem.quote}”</p>
            <span className="slot-location">{leftItem.location}</span>

            {/* Left Nav Arrow */}
            <button
              type="button"
              className="slot-nav-btn prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={16} />
            </button>
          </div>

          {/* 2. CENTER CARD (Highlighted & Prominent) */}
          <div className="testimonial-slot center-slot">
            <div className="avatar-wrap main-avatar-wrap">
              <img src={centerItem.avatar} alt={centerItem.name} />
            </div>

            <div className="center-name-block">
              <h3>{centerItem.name}</h3>
              <span className="project-type-tag">
                {centerItem.role} • {centerItem.location}
              </span>
            </div>

            {/* Stars */}
            <div className="center-stars-row">
              {[...Array(centerItem.rating)].map((_, i) => (
                <Star key={i} size={15} fill="#4b584a" color="#4b584a" />
              ))}
            </div>

            <p className="center-quote-text">“{centerItem.quote}”</p>

            {/* Kitchen Photo Thumbnail & Verified Badge */}
            <div className="center-kitchen-preview">
              <img
                src={centerItem.kitchenThumb}
                alt="Finished Kitchen by KitchenCraft"
                className="thumb-img"
              />
              <div className="thumb-meta">
                {centerItem.verified && (
                  <span className="verified-pill">
                    <BadgeCheck size={14} />
                    Verified Project
                  </span>
                )}
                <span className="thumb-caption">Actual Finished Kitchen</span>
              </div>
            </div>
          </div>

          {/* 3. RIGHT CARD (Faded) */}
          <div className="testimonial-slot side-slot right-slot" onClick={nextSlide}>
            <div className="avatar-wrap">
              <img src={rightItem.avatar} alt={rightItem.name} />
            </div>
            <h4>{rightItem.name}</h4>
            <p className="slot-quote">“{rightItem.quote}”</p>
            <span className="slot-location">{rightItem.location}</span>

            {/* Right Nav Arrow */}
            <button
              type="button"
              className="slot-nav-btn next-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next Testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* DOTS INDICATOR */}
        <div className="carousel-dots">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitchenTestimonials;