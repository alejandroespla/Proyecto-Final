import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Navbar } from "../components/Navbar.jsx"
import { Banner } from "../components/Banner.jsx"
import useGlobalReducer from "../hooks/useGlobalReducer";

import { SectionCard } from "../components/SectionCard.jsx";
import { SubsectionCard } from "../components/SubsectionCard.jsx";

import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Product } from "../components/CardProducto.jsx";
import ciclismo from "../assets/img/ciclismo.jpg"
import mountain_bike from "../assets/img/mountain_bike.jpg"
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg"


export const Home = () => {

	const [categories, setCategories] = useState([]);
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/products`)
			.then(res => res.json())
			.then(data => setCategories(data))
			.catch(err => console.error(err));
	}, []); 


	return (
		<div>
			<div className="bg-body-tertiary">
				<div className="">
					< Navbar />
				</div>

			</div> 
			<div className="mb-5"> 
=======
			</div>

			<div className="mb-5">
				{store.currentUser ? (
					<div></div>
				) : (
					<Banner />
				)}

				<Banner/>
			</div>

			{categories.map((cat, index) => (
				<SectionCard
					key={index}
					title={cat.category}
					image={null}            // ← sin banner: carrusel ocupa todo el ancho
					reverse={false}         // ya no importa alternar si no hay banner
				>
					{cat.products.map((product) => (
						<SubsectionCard
							key={product.id}
							id={product.id}      // ← necesario para navegar a /producto/:id
							image={"https://via.placeholder.com/300"}
							title={product.title}
							price={`${product.price}€/día`}
						/>
					))}
				</SectionCard>
			))}
			<CardProducto></CardProducto>
			<Footer></Footer>

		</div>


	);
}; 