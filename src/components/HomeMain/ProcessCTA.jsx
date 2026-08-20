import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import "../../styles/HomeStyles/processCTA.css";

const ProcessCTA = () => {
  const whatsappNumber = "919876543210";

  const message = encodeURIComponent(
    "Hi, I would like to discuss a kitchen design for my home."
  );

  return (
    <section className="process-cta-section">
      <div className="process-cta-inner">
        <div className="process-cta-content">
          <span className="process-cta-eyebrow">
            HAVE A PROJECT IN MIND?
          </span>
          <h2>
            Let's create a kitchen
            <em> made for you.</em>
          </h2>
          <p>
            Tell us a little about your space and what
            you're looking for. We'll take it from there.
          </p>
        </div>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="process-whatsapp"
        >
          <span className="whatsapp-icon">
            <MessageCircle size={18} />
          </span>
          <span>
            Start a query
            <small>Connect with us on WhatsApp</small>
          </span>
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
};

export default ProcessCTA;