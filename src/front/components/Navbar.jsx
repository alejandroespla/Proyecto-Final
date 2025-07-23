import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
			<div className="container-fluid d-flex flex-nowrap">

				<a className="navbar-brand pt-0" href="#"><img className="imgLogo" src="public/Logo.png" alt="" /> </a>
				<div className="w-100 searchBox">
					<form className="w-100 d-flex align-items-center">
						<div className=" position-relative w-100  d-flex align-items-center ">
							<input type="search" className="w-100 searchBox_input "  placeholder="Buscar"/>

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

				</div>
				
			</div>

		</nav>
	);
};