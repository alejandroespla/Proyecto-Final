import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
	const [backgroundUrl, setBackgroundUrl] = useState("");
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [emailError, setEmailError] = useState(null);

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
		setEmailError(null);

		const email = e.target.email.value;

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/password-reset`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				});

			if (response.ok) {
				setMessage("Te hemos enviado un enlace de recuperación al correo proporcionado.");
			} else {
				const data = await response.json();
				if (response.status === 404) {
					setEmailError(data.message || "Email no registrado");
				} else {
					setError(data.message || "No se pudo procesar la solicitud.");
				}
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
						src="../src/front/assets/img/logo.png"
						style={{ maxWidth: "220px", width: "100%", borderRadius: "24px" }}
						alt="Logo"
					/>
				</Link>
				<h2 className="text-center mb-4">Recuperar contraseña</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="email@example.com"
							required
							onChange={() => setEmailError(null)}
						/>
						{emailError && (
							<div className="text-danger small mt-1">{emailError}</div>
						)}
					</div>
					<div className="d-grid my-4">
						<button type="submit" className="btn" style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}>
							Enviar enlace de recuperación
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
