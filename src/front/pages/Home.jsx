import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Navbar } from "../components/Navbar.jsx"
import { Banner } from "../components/Banner.jsx"
import useGlobalReducer from "../hooks/useGlobalReducer";

import { SectionCard } from "../components/SectionCard.jsx";
import { SubsectionCard } from "../components/SubsectionCard.jsx";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";

import ciclismo from "../assets/img/ciclismo.jpg";
import mountain_bike from "../assets/img/mountain_bike.jpg";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";

import Skeleton from 'react-loading-skeleton';

//import 'react-loading-skeleton/dist/skeleton.css'; ESTO HAY QUE AGREGARLO PARA LOS RODUCTOS CUANDO ESTEN CARGANDO



export const Home = () => {

	const [categories, setCategories] = useState([]);
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}api_product/products`)
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
				{store.currentUser ? (
					<div></div>
				) : (
					<Banner />
				)}

			</div>
			
			


			<Footer></Footer>

		</div>


	);
}; 