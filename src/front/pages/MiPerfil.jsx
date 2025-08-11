import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MiPerfil = () => {
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    if (!token) {
      setError("No estás autenticado");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuario");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFullname(data.fullname);
        setUsername(data.username);
        setLoading(false);
        setIsChanged(false);
      })
      .catch(() => {
        setError("Error al cargar datos del usuario");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (!user) return;
    if (fullname !== user.fullname || username !== user.username) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [fullname, username, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullname, username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al actualizar");
      } else {
        setMsg("Perfil actualizado correctamente");
        setUser(data.user);
        setIsChanged(false);
      }
    } catch {
      setError("Error de conexión");
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setFullname(user.fullname);
    setUsername(user.username);
    setMsg(null);
    setError(null);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>Mi Perfil</h2>

      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#007bff",
          display: "inline-flex",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "20px",
          fontWeight: "500",
        }}
      >
        <span style={{ fontSize: "1.5rem", marginRight: "6px" }}>←</span>
        Regresar a la home
      </Link>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email (no editable)
          </label>
          <input type="email" id="email" className="form-control" value={user.email} disabled />
        </div>

        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            id="fullname"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success me-2" disabled={!isChanged}>
          Guardar cambios
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={!isChanged}>
          Cancelar
        </button>
      </form>
    </div>
  );
};
