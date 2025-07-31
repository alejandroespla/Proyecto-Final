import React, { useRef, useState } from "react";
import "../styles/sectioncard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SectionCard = ({ title, image, reverse = false, children }) => {
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const totalItems = React.Children.count(children);
  const itemsPerPage = 6; // 2 filas de 3 columnas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setScrollIndex(index);
  };

  const handlePrev = () => {
    if (scrollIndex > 0) scrollTo(scrollIndex - 1);
  };

  const handleNext = () => {
    if (scrollIndex < totalPages - 1) scrollTo(scrollIndex + 1);
  };

  return (
    <div className="container my-5 section-card">
      <h3 className="fw-bold mb-3">{title}</h3>
      <div className={`d-flex flex-wrap flex-md-nowrap ${reverse ? "flex-row-reverse" : ""}`}>
        
        {/* Imagen descriptiva */}
        <div className="banner-col">
          <img src={image} alt={title} className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover" />
        </div>

        {/* Contenedor de tarjetas */}
        <div className="cards-col position-relative">
          {/* Flechas */}
          <button className="carousel-btn left" onClick={handlePrev} disabled={scrollIndex === 0}>
            <FaChevronLeft />
          </button>
          <button className="carousel-btn right" onClick={handleNext} disabled={scrollIndex === totalPages - 1}>
            <FaChevronRight />
          </button>

          {/* Carrusel */}
          <div className="scroll-container" ref={scrollRef}>
            <div className="grid-container">
              {children}
            </div>
          </div>

          {/* Puntos de navegación */}
          <div className="dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={`dot ${scrollIndex === i ? "active" : ""}`}
                onClick={() => scrollTo(i)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
