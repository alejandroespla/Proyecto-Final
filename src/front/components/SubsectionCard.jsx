import React from "react";
import "../styles/subsectioncard.css";

export const SubsectionCard = ({ image, title, price, oldPrice, discount }) => {
  return (
    <div className="sub-card shadow-sm">
      {/* Imagen del producto */}
      <div className="sub-card-img">
        <img src={image} alt={title} />
      </div>

      {/* Información del producto */}
      <div className="sub-card-body">
        <h6 className="sub-card-title">{title}</h6>

        <div className="sub-card-price">
          <span className="current-price">{price}</span>
          {oldPrice && <span className="old-price">{oldPrice}</span>}
          {discount && <span className="discount">-{discount}%</span>}
        </div>
      </div>
    </div>
  );
};
