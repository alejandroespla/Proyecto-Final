import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";

export const CardProducto = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!currentUser?.id) {
      alert("Debes iniciar sesión.");
      return;
    }
    const ok = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!ok) return;

    try {
      setDeleting(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: currentUser.id }) // provisional (mejor JWT en backend)
      });

      if (res.status === 403) {
        alert("No puedes eliminar este producto.");
        return;
      }
      if (!res.ok) throw new Error("Error al eliminar");

      alert("Producto eliminado");
      navigate("/"); 
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el producto.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="container my-5">Cargando producto…</div>;
  if (!prod) return <div className="container my-5">Producto no encontrado</div>;

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <img
              //src={prod.image }//|| "https://via.placeholder.com/800x600"}
              src={cyclist_bycicle}
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