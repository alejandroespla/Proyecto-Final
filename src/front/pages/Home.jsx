import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx"
import { Banner } from "../components/Banner.jsx"

import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";

export const Home = () => {
	/*
		const { store, dispatch } = useGlobalReducer()
	
		const loadMessage = async () => {
			try {
				const backendUrl = import.meta.env.VITE_BACKEND_URL
	
				if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
	
				const response = await fetch(backendUrl + "/api/hello")
				const data = await response.json()
	
				if (response.ok) dispatch({ type: "set_hello", payload: data.message })
	
				return data
	
			} catch (error) {
				if (error.message) throw new Error(
					`Could not fetch the message from the backend.
					Please check if the backend is running and the backend port is public.`
				);
			}
	
		}
	
		useEffect(() => {
			loadMessage()
		}, [])
	*/

	return (
		<div>
			<div className="bg-body-tertiary">
				<div className="container">
					< Navbar />
				</div>
			</div>
			<div><Banner /></div>


			<h2>Prueba</h2>
			<Footer></Footer>

		</div>


	);
}; 