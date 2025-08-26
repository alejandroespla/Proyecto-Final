import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";
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
import mountain_bike from "../assets/img/mountain_bike.jpg";
import otros1 from "../assets/img/otros1.png";
import otros2 from "../assets/img/otros2.png";
import otros3 from "../assets/img/otros3.jpg";
import image_not_found from "../assets/img/ImageNotFound.png";

const imagesByCategory = {
  "deportes de pelota": [pelota2, pelota3, pelota],
  "deportes de agua": [agua1, agua2, agua3],
  "deportes de montaña": [mountain, mountain2, mountain3],
  "deportes sobre ruedas": [mountain_bike, ruedas, cyclist_bycicle],
  "otros deportes": [otros1, otros2, otros3],
};
const normalizeCategory = (cat) => (cat || "").trim().toLowerCase();

export const CardProducto = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showReserva, setShowReserva] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

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

  const calcularPrecio = () => {
    if (!fechaInicio || !fechaFin) return 0;
    const diferenciaTiempo = Math.abs(fechaFin - fechaInicio);
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24) + 1);
    return diferenciaDias * prod.price;
  };

  const confirmarReserva = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Escoja un rango de fechas válida.");
      return;
    }
    const reserva = {
      producto: prod,
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString(),
      total: calcularPrecio(),
      dueño: prod.username,
      ownerId: prod.user_id,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    setShowReserva(false);
    alert("Artículo reservado!");
    navigate("/mis-reservas");
  };

  const handleDelete = async () => {
    if (!currentUser?.id) {
      alert("Debes iniciar sesión.");
      return;
    }
    const ok = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!ok) return;

    try {
      setDeleting(true);
      const res = await fetch(`${backendApi}/api_product/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: currentUser.id }),
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

  const handleOpenChat = async () => {
    if (!currentUser?.id) {
      alert("Debes iniciar sesión para contactar.");
      return;
    }

    try {
      const res = await fetch(`${backendApi}/api_message/open_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_a_id: currentUser.id,
          user_b_id: prod.user_id,
          product_id: prod.id,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }
      const chat = await res.json();
      navigate(`/inbox/${chat.id}`);
    } catch (e) {
      console.error("Error abrir chat:", e);
      alert(`No se pudo abrir el chat: ${e.message}`);
    }
  };

  if (loading) return <div className="container my-5">Cargando producto…</div>;
  if (!prod) return <div className="container my-5">Producto no encontrado</div>;

  let imgArray = imagesByCategory[normalizeCategory(prod.category)] || [image_not_found];
  let mainImage = imgArray[0] || image_not_found;

  return (
    <div>
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          ✕
        </button>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <img src={mainImage} alt={prod.title} className="img-fluid rounded shadow-sm" />
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
              {currentUser?.id !== prod.user_id && (
                <button className="btn btn-primary" onClick={() => setShowReserva(true)}>
                  Reservar
                </button>
              )}
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

      {showReserva && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setShowReserva(false)}></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-style p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="modal-title">Reservar {prod.title}</h5>
                  <button className="btn-close" type="button" onClick={() => setShowReserva(false)}></button>
                </div>
                <p>
                  Precio por día: <strong>{prod.price} €</strong>
                </p>
                <div className="d-flex gap-2 mb-3">
                  <DatePicker
                    selected={fechaInicio}
                    onChange={(fecha) => setFechaInicio(fecha)}
                    selectsStart
                    startDate={fechaInicio}
                    endDate={fechaFin}
                    placeholderText="Fecha de inicio"
                  />
                  <DatePicker
                    selected={fechaFin}
                    onChange={(fecha) => setFechaFin(fecha)}
                    selectsEnd
                    startDate={fechaInicio}
                    endDate={fechaFin}
                    minDate={fechaInicio}
                    placeholderText="Fecha de finalización"
                  />
                </div>
                <p>
                  Total: <strong>{calcularPrecio()} €</strong>
                </p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={() => setShowReserva(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={confirmarReserva}>
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};
