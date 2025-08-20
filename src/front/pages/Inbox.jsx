import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_message/inbox/${currentUser.id}`);
        if (!res.ok) throw new Error("Error al cargar mensajes");
        const data = await res.json();
        setMessages(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Debes iniciar sesión para ver tus mensajes</h2>
          <Link to="/login" className="btn btn-primary mt-3">
            Ir a Login
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">📩 Mis Mensajes</h2>

        {loading && <p>Cargando mensajes...</p>}

        {!loading && messages.length === 0 && (
          <div className="alert alert-info">No tienes mensajes todavía.</div>
        )}

        <div className="list-group shadow-sm rounded">
          {messages.map((msg) => (
            <Link
              key={msg.id}
              to={`/inbox/${msg.id}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{msg.sender_username}</strong>  
                <p className="mb-1 text-muted">{msg.content.slice(0, 50)}...</p>
              </div>
              <small className="text-muted">
                {new Date(msg.timestamp).toLocaleDateString()}
              </small>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
