import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";

// imágenes productos
import image_not_found from "../assets/img/ImageNotFound.png";
import pelota from "../assets/img/pelota.png";
import pelota2 from "../assets/img/pelota2.jpg";
import pelota3 from "../assets/img/pelota3.png";
import agua1 from "../assets/img/agua1.png";
import agua2 from "../assets/img/agua2.jpg";
import agua3 from "../assets/img/agua3.jpg";
import mountain from "../assets/img/mountain.jpg";
import mountain2 from "../assets/img/mountain2.jpg";
import mountain3 from "../assets/img/mountain3.png";
import ruedas from "../assets/img/ruedas.jpg";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";
import mountain_bike from "../assets/img/mountain_bike.jpg";
import otros1 from "../assets/img/otros1.png";
import otros2 from "../assets/img/otros2.png";
import otros3 from "../assets/img/otros3.jpg";

import logo from "../assets/img/logo.png";

const imagesByCategory = {
  "deportes de pelota": [pelota, pelota2, pelota3],
  "deportes de agua": [agua1, agua2, agua3],
  "deportes de montaña": [mountain, mountain2, mountain3],
  "deportes sobre ruedas": [mountain_bike, ruedas, cyclist_bycicle],
  "otros deportes": [otros1, otros2, otros3],
};

const normalizeCategory = cat => (cat || "").trim().toLowerCase();

export const CardProducto = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const backendApi = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${backendApi}/api_product/product/${id}`);
        if (!res.ok) throw new Error("Error cargando producto");
        const data = await res.json();
        setProd(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, backendApi]);

  // Aquí asumimos que prod.category existe solo cuando vienes de detalles individuales
  const prodCategory = normalizeCategory(prod?.category);
  const images = imagesByCategory[prodCategory] || [image_not_found, image_not_found, image_not_found];

  if (loading) return <div className="container my-5">Cargando producto…</div>;
  if (!prod) return <div className="container my-5">Producto no encontrado</div>;

  return (
    <div>
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ✕
        </button>
      </div>
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            {/* Mostrar la primera imagen de la categoría */}
            <img src={images[0]} alt={prod.title} className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-6">
            <h2 className="mb-2">{prod.title}</h2>
            <p className="text-muted">
              {prod.category} / {prod.subcategory}
            </p>
            <h3 className="text-danger mb-3">{prod.price} €/día</h3>
            <p className="mb-4">{prod.description}</p>
            <div className="d-flex flex-column gap-1 mb-4">
              <span>
                <strong>Ubicación:</strong> {prod.location || "—"}
              </span>
              <span>
                <strong>Publicado por:</strong> {prod.username}
              </span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary">Reservar</button>
              {currentUser?.id !== prod.user_id && (
                <button className="btn btn-outline-secondary" onClick={handleOpenChat}>
                  Contactar
                </button>
              )}
              {currentUser?.id === prod.user_id && (
                <>
                  <Link to={`/products/${id}/edit`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button
                    id="btn-eliminar"
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Eliminando…" : "Eliminar"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
