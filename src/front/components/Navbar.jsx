import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
				<div className="container-fluid d-flex flex-nowrap">

					<a className="navbar-brand pt-0" href="/"><img className="imgLogo" src="public/Logo.png" alt="" /> </a>
					<div className="w-100 searchBox">
						<form className="w-100 d-flex align-items-center">
							<div className=" position-relative w-100  d-flex align-items-center ">
								<input type="search" className="w-100 searchBox_input " placeholder="Buscar" />

							</div>
						</form>
					</div>
					<div className="d-none d-lg-flex align-items-center">
						<div className="d-flex">
							<Link to={"/Login"} ><button type="button" className="checkRegrister  btn btn-outline-success" >Login </button></Link>
						</div>
						<Link to={"/Login"} >
							<button type="button" class="checkPay btn btn-success">Vender</button>
						</Link>
						<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>

					</div>
				</div>
			</nav>
			<div className="d-block">
				<div className="d-block" >
					<section className="categorias" >
						<div className=" d-flex align-items-center seleccionGrid">
							<div className="seleccionCategoria">
								<button className="buttonCategoria">
									<span>Todas las categorias</span>
								</button>

							</div>

							<nav className="nav seleccionGrid" aria-label="top_categorias">
								<a>Primera categoria</a>
								<a>Segunda Categoria</a>
								<a> Tercera categoria</a>
							</nav>
						</div>


					</section>
				</div>

			</div>
		</div>

	);
};