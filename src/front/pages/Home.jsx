import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx"
import { Banner } from "../components/Banner.jsx"
import { SectionCard } from "../components/SectionCard.jsx";
import { SubsectionCard } from "../components/SubsectionCard.jsx";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import ciclismo from "../assets/img/ciclismo.jpg"
import mountain_bike from "../assets/img/mountain_bike.jpg"
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg"

export const Home = () => {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/products") // hay que crear ese endpoint en el backend
			.then(res => res.json())
			.then(data => setCategories(data))
			.catch(err => console.error(err));
	}, []);

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
				<div className="">
					< Navbar />
				</div>
			</div>
			<Banner className="mb-5"/>
			{categories.map((cat, index) => (
				<SectionCard
					key={index}
					title={cat.category}
					image="https://via.placeholder.com/400x400" // Estas imagenes podemos agregarlas nosotros, no son las de los articulos
					reverse={index % 2 !== 0} //Para alternar la iamgen de las Categorias (En principio debe funcionar ajjaajjaja)
				>
					{cat.products.map((product) => (
						<SubsectionCard
							key={product.id}
							image="https://via.placeholder.com/300" // Estas imagenes podemos agregarlas nosotros, no son las de los articulos
							title={product.title}
							price={`${product.price}€/día`}
						/>
					))}
				</SectionCard>
			))}
			<h2>Prueba</h2>
			<Footer></Footer>

		</div>


	);
}; 