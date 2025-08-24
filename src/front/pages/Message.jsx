import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const Message = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt-token");
  const backendApi = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId || !currentUser?.id || !token) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendApi}/api_message/chat/${chatId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        setMessages(data);
      } catch (e) {
        console.error("Error cargando mensajes", e);
        alert("No se pudieron cargar los mensajes: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !token) return;
    setSending(true);

    try {
      const res = await fetch(`${backendApi}/api_message/chat/${chatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender_id: currentUser.id,
          content: input.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    } catch (e) {
      console.error("Error enviando mensaje:", e);
      alert(`No se pudo enviar el mensaje: ${e.message}`);
    } finally {
      setSending(false);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Debes iniciar sesión para ver el chat</h2>
          <Link to="/login" className="btn btn-primary mt-3">
            Ir a Login
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (loading) return <p className="text-center my-5">Cargando mensajes...</p>;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Chat</h2>
        <div
          className="chat-window border p-3 mb-3"
          style={{ height: "400px", overflowY: "auto", borderRadius: "16px", background: "#ffffffff" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="d-flex"
              style={{
                justifyContent: msg.sender_id === currentUser.id ? "flex-end" : "flex-start",
                marginBottom: "8px"
              }}
            >
              <div
                className={`message p-3 ${msg.sender_id === currentUser.id ? "bg-primary text-white" : "bg-white text-dark border"}`}
                style={{
                  borderRadius: "16px",
                  display: "inline-block",
                  maxWidth: "50%",
                  wordBreak: "break-word",
                  textAlign: "left"
                }}
              >
                {msg.content}
                <br />
                <small style={{ fontSize: "0.75rem", color: msg.sender_id === currentUser.id ? "#ffffffff" : "#877d7dff" }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-group">
          <textarea
            className="form-control me-4 p-3"
            style={{ borderRadius: "16px" }}
            rows="2"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
          ></textarea>
          <button className="btn btn-outline-success" onClick={handleSendMessage} disabled={sending || !input.trim()}
            style={{ minWidth:"160px", borderRadius: "16px" }}
          >
            {sending ? "Enviando..." : "Enviar"}

          </button>
        </div>

        <Link to="/inbox" className="btn btn-link mt-3">
          ← Volver a chats
        </Link>
      </div>
      <Footer />
    </>
  );
};
