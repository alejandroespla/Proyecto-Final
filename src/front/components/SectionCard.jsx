import React, { useRef, useState } from "react";
import "../styles/sectioncard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SectionCard = ({ title, subtitle, image = null, reverse = false, children }) => {
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const totalItems = React.Children.count(children);
  const itemsPerPage = 3; // 2 filas x 3 columnas visibles
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const viewport = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: viewport * index, behavior: "smooth" });
    setScrollIndex(index);
  };

  const handlePrev = () => scrollIndex > 0 && scrollTo(scrollIndex - 1);
  const handleNext = () => scrollIndex < totalPages - 1 && scrollTo(scrollIndex + 1);

  const hasBanner = Boolean(image);

  return (
    <div className="container my-5 section-card">
      <h3 className="fw-bold mb-1">{title}</h3>
      {subtitle && <h5 className="text-muted mb-3">{subtitle}</h5>}

      <div className={`d-flex ${hasBanner ? "flex-wrap flex-md-nowrap" : "w-100"} ${reverse && hasBanner ? "flex-row-reverse" : ""}`}>
        {hasBanner && (
          <div className="banner-col">
            <img src={image} alt={title} className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover" />
          </div>
        )}

        <div className={`cards-col position-relative ${!hasBanner ? "cards-col-full" : ""}`}>
          <button className="carousel-btn left" onClick={handlePrev} disabled={scrollIndex === 0}>
            <FaChevronLeft />
          </button>
          <button className="carousel-btn right" onClick={handleNext} disabled={scrollIndex === totalPages - 1}>
            <FaChevronRight />
          </button>

          <div className="scroll-container" ref={scrollRef}>
            <div className="grid-container">{children}</div>
          </div>

          <div className="dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span key={i} className={`dot ${scrollIndex === i ? "active" : ""}`} onClick={() => scrollTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
