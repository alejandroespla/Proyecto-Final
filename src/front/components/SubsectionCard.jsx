import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/subsectioncard.css";

export const SubsectionCard = ({ id, image, title, price, oldPrice, discount }) => {
  const navigate = useNavigate();
  const { store } = useGlobalReducer();

  const handleClick = () => {
    if (store?.currentUser) navigate(`/products/details/${id}`);
    else navigate("/login");
  };

  return (
    <div className="sub-card shadow-sm" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="sub-card-img">
        <img src={image} alt={title} />
      </div>
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
