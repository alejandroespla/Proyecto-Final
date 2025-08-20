import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const Message = () => {
  const { messageId } = useParams();
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_message/messages/detail/${messageId}`);
        if (!res.ok) throw new Error("Error al cargar el mensaje");
        const data = await res.json();
        setMessage(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [messageId]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_message/messages/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: currentUser.id,
          receiver_id: message.sender_id,
          content: reply,
          product_id: message.product_id,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar respuesta");
      setReply("");
      alert("Mensaje enviado!");
    } catch (e) {
      console.error(e);
      alert("Hubo un error al enviar el mensaje");
    } finally {
      setSending(false);
    }
  };

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Debes iniciar sesión para ver este mensaje</h2>
          <Link to="/login" className="btn btn-primary mt-3">Ir a Login</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) return <p className="text-center my-5">Cargando mensaje...</p>;
  if (!message) return <p className="text-center my-5">Mensaje no encontrado</p>;

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-3">Mensaje de {message.sender_username || message.sender_id}</h2>
        <div className="shadow-sm rounded p-4 mb-4 bg-light">
          <p>{message.content}</p>
          <small className="text-muted">Enviado el {new Date(message.timestamp).toLocaleString()}</small>
        </div>

        <div className="mb-4">
          <h5>Responder</h5>
          <textarea
            className="form-control mb-2"
            rows="4"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escribe tu respuesta..."
          ></textarea>
          <button className="btn btn-primary" onClick={handleReply} disabled={sending}>
            {sending ? "Enviando..." : "Enviar"}
          </button>
        </div>

        <Link to="/inbox" className="btn btn-secondary mt-3">← Volver a Inbox</Link>
      </div>
      <Footer />
    </div>
  );
};
