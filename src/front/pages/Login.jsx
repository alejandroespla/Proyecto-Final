import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [errors, setErrors] = useState({});       // <-- AÑADIDO
  const [submitting, setSubmitting] = useState(false);

  const backgrounds = [
    "https://static.nationalgeographic.es/files/styles/image_3200/public/gettyimages-1272468011.webp?w=1600&h=1068",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEPT9_GDJ1885ZHKbBP0AYr1dCFIcGJF9o8w&s",
    "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/whoinventedfootball?_a=BAVAZGDX0",
    "https://thewfa.co.uk/wp-content/uploads/2020/07/social-preview.jpg"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundUrl(backgrounds[randomIndex]);
  }, []);

  const currentBackground = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validación rápida
    const newErrors = {};
    if (!email) newErrors.email = "El email es obligatorio";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("jwt-token", data.token);
        dispatch({ type: "set_current_user", payload: data.user || null });
        navigate("/"); // mejor que window.location.href
      } else {
        // Mostrar error del backend o genérico
        setErrors({ form: data.error || "Error en el login" });
      }
    } catch (error) {
      console.error("Error completo en login:", error);
      setErrors({ form: "Error de conexión. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={currentBackground} className="d-flex justify-content-start p-5">
      <div className="d-flex align-content-center card shadow-sm p-5 bg-white bg-opacity-75" style={{ maxWidth: "600px", width: "100%", borderRadius: "24px" }}>
        <Link to={"/"} >
          <img
            className="mx-auto d-block mb-3"
            src="../src/front/assets/img/logo.png"
            style={{ maxWidth: "280px", width: "100%", borderRadius: "24px" }}
            alt="Logo"
          />
        </Link>

        <h2 className="text-center mb-4">Login</h2>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="email@example.com"
              autoComplete="username"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

            <div className="mt-2 text-center">
              <Link to="/forgot-password" className="text-decoration-none">
                He olvidado el password
              </Link>
            </div>
          </div>

          <div className="d-grid my-4">
            <button
              type="submit"
              className="btn"
              disabled={submitting}
              style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}
            >
              {submitting ? "Entrando..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="me-1">¿No tienes cuenta?</p>
          <Link to={"/register"}>
            <p>Regístrate aquí</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
