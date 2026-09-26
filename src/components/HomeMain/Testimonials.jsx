import React, { useState } from "react";
import "./Testimonials.css";

import testimonial1 from "../../images/projects/IMG_8260.jpg";
import testimonial2 from "../../images/projects/IMG_8266.jpg";
import testimonial3 from "../../images/projects/IMG_8270.jpg";

const testimonials = [
  {
    image: testimonial1,
    quote:
      "The entire process was simple and beautifully planned. Our kitchen now feels like it was made specifically for us.",
    name: "Anita Thomas",
    location: "Kochi, Kerala",
  },
  {
    image: testimonial2,
    quote:
      "From the first design to the final installation, everything felt thoughtful, clear and effortless.",
    name: "Rahul Menon",
    location: "Thrissur, Kerala",
  },
  {
    image: testimonial3,
    quote:
      "They understood exactly how we wanted to use our space. The result is practical, elegant and completely ours.",
    name: "Meera Nair",
    location: "Kochi, Kerala",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setActive(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <div className="testimonials-heading">
          <span>CLIENT STORIES</span>
          <h2>
            What Our Clients
            <br />
            Response
          </h2>
        </div>

        <div className="testimonial-content">

          <div className="testimonial-image-wrap">
            <img
              key={current.image}
              src={current.image}
              alt={`${current.name} kitchen`}
            />
          </div>

          <div className="testimonial-text">

            <div className="quote-mark">“</div>

            <blockquote key={current.quote}>
              {current.quote}
            </blockquote>

            <div className="testimonial-client">
              <span></span>

              <div>
                <h4>{current.name}</h4>
                <p>{current.location}</p>
              </div>
            </div>

            <div className="testimonial-bottom">

              <div className="testimonial-counter">
                <span>0{active + 1}</span>

                <div className="counter-line">
                  <div
                    style={{
                      width: `${
                        ((active + 1) / testimonials.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <span>0{testimonials.length}</span>
              </div>

              <div className="testimonial-arrows">
                <button onClick={previousTestimonial}>←</button>
                <button onClick={nextTestimonial}>→</button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;