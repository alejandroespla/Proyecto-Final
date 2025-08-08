import React, { useState } from "react";
import { AddProduct } from "./AddProduct";

export const AddProductModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpen}
      >
        Nuevo producto
      </button>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Publicar nuevo producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <AddProduct />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
