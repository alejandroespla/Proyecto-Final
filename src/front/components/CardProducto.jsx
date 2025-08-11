import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const CardProducto = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`);
        const data = await res.json();
        setProd(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="container my-5">Cargando producto…</div>;
  if (!prod) return <div className="container my-5">Producto no encontrado</div>;

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <img
              src={prod.image || "https://via.placeholder.com/800x600"}
              alt={prod.title}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-2">{prod.title}</h2>
            <p className="text-muted">{prod.category} / {prod.subcategory}</p>
            <h3 className="text-danger mb-3">{prod.price} €/día</h3>

            <p className="mb-4">{prod.description}</p>

            <div className="d-flex flex-column gap-1 mb-4">
              <span><strong>Ubicación:</strong> {prod.location || "—"}</span>
              <span><strong>Publicado por:</strong> {prod.username}</span>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary">Reservar</button>
              <button className="btn btn-outline-secondary">Contactar</button>
              {/* Botón de prueba "Editar" */}
              {/* Si quieres mostrarlo siempre para probar, deja solo el Link. 
                  Si quieres mostrarlo solo al dueño, envuelve con la condición: */}
                { currentUser?.id === prod.user_id && (
                  <Link to={`/products/${id}/edit`} className="btn btn-warning">
                    Editar
                  </Link>
                )} 

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};