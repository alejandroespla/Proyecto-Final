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

  const backgrounds = [
    "https://static.nationalgeographic.es/files/styles/image_3200/public/gettyimages-1272468011.webp?w=1600&h=1068",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEPT9_GDJ1885ZHKbBP0AYr1dCFIcGJF9o8w&s",
    "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/whoinventedfootball?_a=BAVAZGDX0",
    "https://thewfa.co.uk/wp-content/uploads/2020/07/social-preview.jpg"
  ];
  
  const [backgroundUrl, setBackgroundUrl] = useState("");
  useEffect(() => {
    setBackgroundUrl(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  useEffect(() => {
    if (!token) {
      setError("No estás autenticado");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}auth/user`, {
      headers: { Authorization: `Bearer ${token}` }
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
    setIsChanged(fullname !== user.fullname || username !== user.username);
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
    <div
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
      className="d-flex justify-content-center align-items-center p-4"
    >
      <div
        className="card shadow-sm p-5 bg-white bg-opacity-75"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "24px" }}
      >
      
        <h2 className="text-center mb-3">Mi Perfil</h2>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "20px",
            fontWeight: "500"
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "6px" }}>←</span>
          Regresar a la home
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email (no editable)</label>
            <input type="email" id="email" className="form-control" value={user.email} disabled />
          </div>

          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Nombre completo</label>
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
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
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

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#fff" }}
              disabled={!isChanged}
            >
              Guardar cambios
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={!isChanged}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
