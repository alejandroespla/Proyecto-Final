import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LogoutButton } from "./CerrarSesion.jsx";
import { AddProductModal } from "../components/AddProductModal";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    console.log("Token que envío:", token);

    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Se manda el token en el header
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            dispatch({ type: "set_current_user", payload: data });
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("user");
            dispatch({ type: "set_current_user", payload: null });
          }
        })
        .catch((err) => {
          console.error("Error al validar token:", err);
          localStorage.removeItem("jwt-token");
          localStorage.removeItem("user");
          dispatch({ type: "set_current_user", payload: null });
        });
    } else {
      localStorage.removeItem("user");
      dispatch({ type: "set_current_user", payload: null });
    }
  }, [dispatch]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const currentUser = store.currentUser;
  const initials = getInitials(currentUser?.fullname);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
        <div className="container-fluid d-flex flex-nowrap">
          <a className="navbar-brand pt-0" href="/">
            <img
              className="imgLogo"
              src="src/front/assets/img/logo.png"
              alt="Logo"
            />
          </a>
          <div className="w-100 searchBox">
            <form className="w-100 d-flex align-items-center">
              <div className="position-relative w-100 d-flex align-items-center">
                <input
                  type="search"
                  className="w-100 searchBox_input"
                  placeholder="Buscar"
                />
              </div>
            </form>
          </div>

          <div className="d-none d-lg-flex align-items-center">
            {currentUser ? (
              <>
                <AddProductModal />

                <div className="dropdown ms-3">
                  <button
                    className="d-flex align-items-center gap-2 btn btn-link text-decoration-none"
                    type="button"
                    id="userMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ padding: 0 }}
                  >
                    <div
                      style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "#2E676A",
                        color: "#fff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        userSelect: "none",
                      }}
                    >
                      {initials}
                    </div>
                    <span style={{ fontSize: "0.8rem", userSelect: "none" }}>
                      ▼
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userMenuButton"
                  >
                    <li>
                      <Link className="dropdown-item" to="/user">
                        Mi perfil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/my-products">
                        Mis productos
                      </Link>
                    </li>
                    <li>
                      <LogoutButton dispatch={dispatch} />
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to={"/Login"}>
                <button type="button" className="btn btn-outline-success">
                  Login
                </button>
              </Link>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <hr className="mb-0" />

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 button-categoria">
              <li className="nav-item border-categoria">
                <a className="nav-link" aria-current="page" href="#">
                  Deporte de montaña
                </a>
              </li>
              <li className="nav-item border-categoria">
                <a className="nav-link" href="#">
                  Deporte de Pelota
                </a>
              </li>
              <li className="nav-item border-categoria">
                <a className="nav-link" href="#">
                  Deporte de Agua
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Otros Deportes
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Sobre ruedas
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bolos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Billar
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <hr className="mt-0" />
    </div>
  );
};
