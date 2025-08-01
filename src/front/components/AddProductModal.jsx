import React, { useState } from "react";
import { AddProduct } from "./AddProduct";
import { useNavigate } from "react-router-dom";

export const AddProductModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSuccess = (productId) => {
    setShow(false);
    navigate(`/product/${productId}`); // Ajusta la ruta según tu estructura
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleOpen}>
        Publicar nuevo producto
      </button>

      {show && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(6, 11, 110, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo producto</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <AddProduct onCancel={handleClose} onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};