import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const [backgroundUrl, setBackgroundUrl] = useState("");

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
		try {
			const email = e.target.email.value;
			const password = e.target.password.value;

			console.log("Credenciales enviadas:", { email, password }); //todos los console log son para depuracion

			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			console.log("Respuesta del backend:", data);

			console.log("Token recibido:", data.token);
			localStorage.setItem("jwt-token", data.token);

			if(res.ok){
				dispatch({ type: "set_current_user", payload: data.user });
				window.location.href = "/"
			}else {
				alert(data.error || "Error en el login");
			}

			/*
			if (res.ok) {
				// 1. Primero guarda en localStorage de forma síncrona
				window.localStorage.setItem("token", data.token);
				window.localStorage.setItem("user", JSON.stringify(data.user));
				
				// 2. Espera un ciclo de evento completo
				await new Promise(resolve => setTimeout(resolve, 0));
				
				// 3. Verifica que los datos se guardaron
				console.log("Verificación localStorage:", {
					token: window.localStorage.getItem("token"),
					user: window.localStorage.getItem("user")
				});
				
				// 4. Actualiza el estado global
				dispatch({ type: "set_current_user", payload: data.user });
				
				// 5. Redirecciona usando window.location en lugar de navigate
				window.location.href = "/"; // Esto evita problemas con React Router
			} else {
				alert(data.error || "Error en el login");
			}*/
		} catch (error) {
			console.error("Error completo en login:", error);
		}
	};



	return (
		<div style={currentBackground} className="d-flex justify-content-start p-5">
			<div className="d-flex align-content-center card shadow-sm p-5 bg-white bg-opacity-75" style={{ maxWidth: "600px", width: "100%", borderRadius: "24px" }}>
				<Link to={"/"} >
					<img className="mx-auto d-block mb-3"
						src="../src/front/assets/img/logo.png"
						style={{ maxWidth: "280px", width: "100%", borderRadius: "24px" }}
						alt="Logo"
					/>
				</Link>
				<h2 className="text-center mb-4">Login</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" required />
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input type="password" className="form-control" id="password" name="password" placeholder="••••••••" required />
					</div>
					<div className="d-grid my-4">
						<button type="submit" className="btn" style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}>Login</button>
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