import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Navbar = () => {


	//Al cargar el navbar, revisamos si hay un usuario en localStorage
	//Buscar otra solucion, porque cada vez que se cargue el navbar en cada pagina
	    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
		console.log("Token que envío:", token);
		

        if (token) {
            //Validar el token contra el backend
            fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}` // Se manda el token en el header
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.id) {
                        //Si el token es valido, se guarda el usuario en el estado global
                        dispatch({ type: "set_current_user", payload: data });
                        localStorage.setItem("user", JSON.stringify(data));
                    } else {
                        // Si el token no es valido, se limpia la sesion
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        dispatch({ type: "set_current_user", payload: null });
                    }
                })
                .catch(err => {
                    console.error("Error al validar token:", err);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    dispatch({ type: "set_current_user", payload: null });
                });
        } else {
            //Si no hay token pero si habia usuario guardado, lo eliminamos
            localStorage.removeItem("user");
            dispatch({ type: "set_current_user", payload: null });
        }
    }, []);

	return (
		<div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
				<div className="container-fluid d-flex flex-nowrap">

					<a className="navbar-brand pt-0" href="/"><img className="imgLogo" src="src/front/assets/img/logo.png" alt="" /> </a>
					<div className="w-100 searchBox">
						<form className="w-100 d-flex align-items-center">
							<div className=" position-relative w-100  d-flex align-items-center ">
								<input type="search" className=" w-100 searchBox_input " placeholder="Buscar" />
							</div>
						</form>
					</div>

					<div className="d-none d-lg-flex align-items-center">
						{store.currentUser ? (
							<div className="d-flex align-items-center gap-2">
								<Link to="/add-product">
								<button 
									type="button" 
									className="checkRegrister btn btn-outline-success"
									style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}
								>Agregar</button>
								</Link>
								<Link to="/user">
									<img
										src="https://ui-avatars.com/api/?name=Usuario" // foto del user
										alt="Perfil"
										style={{ borderRadius: "50%", cursor: "pointer" }}
									/>
								</Link>
							</div>

						) : (
							//Si NO esta logueado, mostrar boton de login
							<Link to={"/Login"}>
								<button type="button" className="checkRegrister btn btn-outline-success">Login</button>
							</Link>
						)}
					</div>
				</div>
			</nav>
			<div className="d-block">
				<div className="d-block" >
					<section className="categorias" >
						<div className=" d-flex align-items-center seleccionGrid">
							<div className="seleccionCategoria dropend" role="group">
								<button type="button" className="buttonCategoria" data-bs-toggle="dropdown" aria-expanded="false" >
									<span>Todas las categorias</span>
								</button>
							</div>
							<div>

							</div>
							<nav className="nav seleccionGridCategorias" aria-label="top_categorias">
								<a className="borderCategoria text-dark link-underline link-underline-opacity-0">Deportes de Pelota</a>
								<a className="borderCategoria text-dark link-underline link-underline-opacity-0">Deportes de Agua</a>
								<a className="borderCategoria text-dark link-underline link-underline-opacity-0">Deportes de Montaña</a>
								<a className="borderCategoria text-dark link-underline link-underline-opacity-0">Deportes sobre ruedas</a>
								<a className="borderCategoria text-dark link-underline link-underline-opacity-0">Otros Deportes</a>
							</nav>
						</div>


					</section>
				</div>

			</div>
		</div>

	);
};