import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";



export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const handleLogin = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		// Aquí podrías llamar a una acción de login o API
		console.log("Iniciando sesión con:", { email, password });

		// Ejemplo: dispatch({ type: "LOGIN", payload: { email, password } });
	};

	return (
		<div className="container d-flex justify-content-center p-5">
			<div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
				<h3 className="text-center mb-4">Login</h3>
				<form onSubmit={handleLogin}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" required />
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input type="password" className="form-control" id="password" name="password" placeholder="••••••••" required />
					</div>
					<div className="d-grid mb-3">
						<button type="submit" className="btn btn-primary">login</button>
					</div>
				</form>
				<div className="text-center">
					<small className="me-1">Don´t have an account?</small>
					<Link to={"/register"}>
						<small>Register here</small>
					</Link>

				</div>
			</div>
		</div >
	);
};