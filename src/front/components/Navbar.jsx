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
              </div>

              <div className="dropdown">
                <button
                  className="d-flex align-items-center gap-2"
                  type="button"
                  id="userMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: "pointer"
                  }}
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
                      userSelect: "none"
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{ fontSize: "0.8rem", userSelect: "none" }}>▼</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
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
              <button
                type="button"
                className="btn btn-outline-success"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
