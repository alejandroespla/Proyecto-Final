import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiOrangeDuotone } from "react-icons/pi";


export const CardProducto = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [showContact, setShowContact] = useState(false);
  const [showReserva, setShowReserva] =useState(false);
  const [message, setMessage] = useState("");

  const [fechaInicio, setFechaInicio]= useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const calcularPrecio = () =>{
    if(!fechaInicio || !fechaFin) return 0;
    const diferenciaTiempo= Math.abs(fechaFin - fechaInicio);
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 *60 *24) +1) //el +1 es para el dia de inicio, el *1000 es para llevar de ms a s
    return diferenciaDias * prod.price;
  }

      const confirmarReserva = () =>{
      if(!fechaInicio || !fechaFin){
        alert("Escoja un rango de fehcas válida.")
        return;
      }

      const reserva={
        producto: prod,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        total: calcularPrecio(),
        dueño: prod.username,
      };

      //esto se va a guardar en el localstorage por el momento mientras se prueba
      const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
      reservas.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));

      setShowReserva(false);
      alert("Artículo reservado!");
      navigate("/mis-reservas");
      return;
    }



  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`
        );
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUser.id }),
        }
      );

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

  const handleSendMessage = async () => {
    if (!currentUser?.id) {
      alert("Debes iniciar sesión para contactar.");
      return;
    }
    if (!message.trim()) {
      alert("Escribe un mensaje.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api_message/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_id: currentUser.id,
            receiver_id: prod.user_id,
            product_id: prod.id,
            content: message,
          }),
        }
      );

      if (!res.ok) throw new Error("Error enviando mensaje");

      alert("Mensaje enviado al propietario ✅");
      setMessage("");
      setShowContact(false);
    } catch (e) {
      console.error(e);
      alert("No se pudo enviar el mensaje.");
    }
  };

  if (loading)
    return <div className="container my-5">Cargando producto…</div>;
  if (!prod)
    return <div className="container my-5">Producto no encontrado</div>;

  return (
    <div>
      {/* botón X para volver atrás */}
      <div className="d-flex justify-content-end p-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <img
              src={cyclist_bycicle}
              alt={prod.title}
              className="img-fluid rounded shadow-sm"
            />
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


              {/* Mostrar "Contactar" solo si NO eres el dueño */}
              {currentUser?.id !== prod.user_id && (
                <>
                    <button 
                    className="btn btn-primary"
                    onClick={() => setShowReserva(true)}
                    >
                      Reservar
                    </button>
                    
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setShowContact(true)}
                    >
                      Contactar
                    </button>
                </>
              )}


              {/* Si eres el dueño: mostrar editar y eliminar */}
              {currentUser?.id === prod.user_id && (
                <>
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-warning"
                  >
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

      {/* modal de contacto */}
      {showContact && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowContact(false)}
          ></div>

          {/* Modal */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-style">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="modal-title"></h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowContact(false)}
                  ></button>
                </div>

                {/* Cuerpo sin línea separadora */}
                <h5 className="m-2">Contactar con {prod.username}</h5>
                <div className="modal-body p-0">
                  <textarea
                    className="form-control border-0 rounded-0"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                  ></textarea>
                </div>

                {/* Footer sin borde superior */}
                <div className="modal-footer border-0">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowContact(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/**Modal para reservar */}
      {showReserva && (
        <>
          <div
          className="modal-backdrop fade show"
          onClick={() => setShowReserva(false)}
          ></div>

          <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ zIndex: 1050}}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-style p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="modal-title">Reservar {prod.title}</h5>
                  <button
                  className="btn-close"
                  type="button"
                  onClick={() => setShowReserva(false)}
                  >
                  </button>
                </div>

                <p>Precio por dia: <strong>{prod.price} €</strong></p>

                <div className="d-flex gap-2 mb-3">
                  <DatePicker
                  selected={fechaInicio}
                  onChange={(fecha)=>setFechaInicio(fecha)}
                  selectsStart
                  fechaInicio={fechaInicio}
                  fechaFin={fechaFin}
                  placeholderText="Fecha de inicio"
                  />

                  <DatePicker
                  selected={fechaFin}
                  onChange={(fecha) => setFechaFin(fecha)}
                  selectsEnd
                  fechaInicio={fechaInicio}
                  fechaFin={fechaFin}
                  minDate={fechaInicio}
                  placeholderText="Fecha de finalizacion"
                  />
                </div>

                <p>Total: <strong>{calcularPrecio()}€</strong></p>

                <div className="d-flex justify-content-end gap-2">
                  <button
                  className="btn btn-secondary"
                  onClick={()=> setShowReserva(false)}
                  >
                    Cancelar
                  </button>

                  <button
                  className="btn btn-primary"
                  onClick={()=> confirmarReserva()}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )

      }

      <Footer />
    </div>
  );
};
