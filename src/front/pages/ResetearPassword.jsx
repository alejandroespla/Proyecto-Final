import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

export const ResetPassword = () => {
    const [backgroundUrl, setBackgroundUrl] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token"); // Captura el token

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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setPasswordError(null);

        if (!token) {
            setError("Token inválido o inexistente. Solicita un nuevo enlace.");
            return;
        }

        const password = e.target.password.value;
        if (password.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Contraseña actualizada correctamente. Redirigiendo al login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.message || "No se pudo actualizar la contraseña.");
            }
        } catch (err) {
            setError("Error al conectar con el servidor. Intenta más tarde.");
            console.error(err);
        }
    };

    return (
        <div style={currentBackground} className="d-flex justify-content-start align-items-start p-5">
            <div className="card shadow-sm p-5 bg-white bg-opacity-75" style={{ maxWidth: "500px", width: "100%", borderRadius: "24px" }}>
                <Link to={"/"}>
                    <img className="mx-auto d-block mb-3"
                        src={logo}
                        style={{ maxWidth: "220px", width: "100%", borderRadius: "24px" }}
                        alt="Logo"
                    />
                </Link>
                <h2 className="text-center mb-4">Restablecer contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Nueva contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            onChange={() => setPasswordError(null)}
                        />
                        {passwordError && (
                            <div className="text-danger small mt-1">{passwordError}</div>
                        )}
                    </div>
                    <div className="d-grid my-4">
                        <button type="submit" className="btn" style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}>
                            Guardar nueva contraseña
                        </button>
                    </div>
                </form>

                {message && <div className="alert alert-success text-center">{message}</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}

                <div className="text-center mt-3">
                    <Link to="/login" className="text-decoration-none">
                        Volver al login
                    </Link>
                </div>
            </div>
        </div>
    );
};
