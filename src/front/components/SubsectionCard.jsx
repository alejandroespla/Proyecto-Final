import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/subsectioncard.css";

export const SubsectionCard = ({
  id,
  // Mantengo compatibilidad: si llega "images" lo uso; si no, uso "image" como array de 1.
  images = [],
  image,
  title,
  price,
  oldPrice,
  discount,
  description,
  available = true
}) => {
  const navigate = useNavigate();
  const { store } = useGlobalReducer();

  const handleClick = () => {
    if (store?.currentUser) navigate(`/products/details/${id}`);
    else navigate("/login");
  };

  const pics = images?.length ? images : (image ? [image] : []);
  const carouselId = useMemo(() => `carousel-prod-${id}`, [id]);

  return (
    <div
      className="select-card text-dark link-underline link-underline-opacity-0"
      role="button"
      
    >
      <div className="product-card shadow-sm">
        {/* Carrusel Bootstrap */}
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
          {pics.length > 1 && (
            <div className="carousel-indicators">
              {pics.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0 ? "true" : undefined}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          <div className="carousel-inner">
            {pics.map((src, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                <img src={src} className="d-block w-100" alt={title} />
              </div>
            ))}
          </div>

          {pics.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </>
          )}
        </div>

        <div className="card-body overflow-y-hidden"
        onClick={handleClick}
        >
          
          <h5 className="card-title">
            {title} {price && <span>{price}</span>}
          </h5>

          {description && <p className="card-text">{description}</p>}

          <div className="d-flex gap-2 align-items-baseline">
            {oldPrice && <span className="old-price">{oldPrice}</span>}
            {discount && <span className="discount">-{discount}%</span>}
          </div>

          <p className="availability mt-1">{available ? "Disponible" : "No disponible"}</p>
        </div>
      </div>
    </div>
  );
};