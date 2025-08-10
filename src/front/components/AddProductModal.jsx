import React, { useState } from "react";
import { AddProduct } from "./AddProduct";
import "../styles/modal.css";

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
          style={{
            display: "block",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(159, 159, 159, 0.6)"
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-title ">
                <h3 className="mt-4" style={{ width: "100%",}}>Publicar nuevo producto</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                />
              </div>
              <div className="modal-style">
                <AddProduct />
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};
