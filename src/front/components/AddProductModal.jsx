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
        className="btn btn-outline-primary d-flex align-items-center"
        onClick={handleOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg>
        Producto
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
                <h3 className="mt-4" style={{ width: "100%", }}>Publicar nuevo producto</h3>
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
