import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import logo from "../assets/img/logo.png";

export const Inbox = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const backendApi = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(`${backendApi}/api_message/inbox/${currentUser.id}`);
        if (!res.ok) throw new Error("Error al cargar chats");
        const data = await res.json();
        setChats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Debes iniciar sesión para ver tus chats</h2>
          <Link to="/login" className="btn btn-primary mt-3">
            Ir a Login
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">💬 Chats</h2>
        {loading && <p>Cargando chats...</p>}
        {!loading && chats.length === 0 && <div className="alert alert-info">No tienes chats todavía.</div>}
        <div className="list-group shadow-sm rounded">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => navigate(`/inbox/${chat.id}`)}
            >
              <div>
                <strong>{chat.other_user_name}</strong>
                <p className="mb-1 text-muted">Producto: {chat.product_id || "Sin producto"}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
