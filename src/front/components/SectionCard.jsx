import React, { useRef, useState } from "react";
import "../styles/sectioncard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SectionCard = ({ title, image, reverse = false, children }) => {
  const scrollRef = useRef(null);
  //Para llevar la apgina actual del carrusel
  const [scrollIndex, setScrollIndex] = useState(0);

  const totalItems = React.Children.count(children); //conteo de cuantas subsectioncard hay
  const itemsPerPage = 6; // 2 filas de 3 columnas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //Funcion para desplazar el carrusel 
  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth; //para saber el ancho visible y multiplicarlo por el indice de pagina
    // Desplazar el carrusel al indice que hace falta
    scrollRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    // Actualizar el indice de pagina
    setScrollIndex(index);
  };

  //Funciones para los botones de flecha
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
          <div className="scroll-container" ref={scrollRef}/*para referenciar el contenedor del carrusel*/>
            <div className="grid-container">
              {children}
            </div>
          </div>

          {/* Puntos de navegacion */}
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
