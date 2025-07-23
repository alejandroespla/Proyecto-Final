import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
			<div className="container-fluid">
				
				<a className="navbar-brand pt-0" href="#"><img className="imgLogo" src="public/Logo.png" alt="" /> </a>
				
				<div className="collapse navbar-collapse ">
					<div className="w-100 searchBox"> 
						<form className="w-100 d-flex align-items-center">
							<div className="position-relative w-100 d-flex">
								<input className=" w-100 search_input " type="search" placeholder="Buscar" />
							</div>
						</form>
					</div>
					<div className="d-none d-lg-flex align-items-center ">
						<div className="d-flex ">
							<Link to={"/Login"} ><button type="button" className="checkRegrister  btn btn-outline-success" >Login </button></Link>
							
						</div>
						<button type="button" class="checkPay btn btn-success">Vender</button>
					</div>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

				</div>

			</div>

		</nav>
	);
};