import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LogoutButton } from "./CerrarSesion.jsx";
import { AddProductModal } from "../components/AddProductModal";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [categoriesData, setCategoriesData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            dispatch({ type: "set_current_user", payload: data });
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("user");
            dispatch({ type: "set_current_user", payload: null });
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt-token");
          localStorage.removeItem("user");
          dispatch({ type: "set_current_user", payload: null });
        });
    } else {
      localStorage.removeItem("user");
      dispatch({ type: "set_current_user", payload: null });
    }
  }, [dispatch]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api_product/products`)
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach((product) => {
          if (!grouped[product.category]) grouped[product.category] = new Set();
          if (product.subcategory) grouped[product.category].add(product.subcategory);
        });
        const finalData = {};
        for (let cat in grouped) {
          finalData[cat] = Array.from(grouped[cat]);
        }
        setCategoriesData(finalData);
      });
  }, []);

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

  const allCategories = [
    "Todas las categorías",
    "Deporte de montaña",
    "Deporte de Pelota",
    "Deporte de Agua",
    "Otros Deportes"
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand pt-0 d-flex align-items-center" href="/">
            <img className="imgLogo" src="src/front/assets/img/logo.png" alt="Logo" />
          </a>

          <div className="searchBox" style={{ flexGrow: 1, maxWidth: "1440px", marginLeft: "auto", marginRight: "auto" }}>
            <form className="w-100 d-flex align-items-center">
              <div className="position-relative w-100 d-flex align-items-center">
                <input type="search" className="w-100 searchBox_input" placeholder="Buscar" />
              </div>
            </form>
          </div>

          <div className="d-flex align-items-center gap-3 m-3">
            {currentUser ? (
              <>
                <div className="text-center my-4">
                  <AddProductModal />
                </div>
                <div className="dropdown">
                  <button
                    className="d-flex align-items-center gap-2"
                    type="button"
                    id="userMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
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
                    <li><Link className="dropdown-item" to="/user">Mi perfil</Link></li>
                    <li><Link className="dropdown-item" to="/my-products">Mis productos</Link></li>
                    <li><LogoutButton dispatch={dispatch} /></li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to={"/Login"}>
                <button type="button" className="btn btn-outline-success">Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{ maxWidth: "1440px" }}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCategories"
            aria-controls="navbarCategories"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCategories">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 button-categoria">
              {allCategories.map((category) => {
                const hasProducts = category === "Todas las categorías" || (categoriesData[category] && categoriesData[category].length > 0);

                return category === "Otros Deportes" ? (
                  <li key={category} className="nav-item dropdown border-categoria">
                    <a
                      className={`nav-link dropdown-toggle ${!hasProducts ? "text-muted disabled" : ""}`}
                      href="#"
                      role="button"
                      data-bs-toggle={hasProducts ? "dropdown" : undefined}
                      aria-expanded="false"
                      style={{ cursor: hasProducts ? "pointer" : "not-allowed" }}
                    >
                      {category}
                    </a>
                    <ul className="dropdown-menu">
                      {(categoriesData[category] && categoriesData[category].length > 0
                        ? categoriesData[category]
                        : ["Sin subcategorías"]
                      ).map((sub) => (
                        <li key={sub}>
                          <a
                            className={`dropdown-item ${categoriesData[category]?.includes(sub) ? "" : "text-muted disabled"}`}
                            href="#"
                          >
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={category} className="nav-item border-categoria">
                    <a
                      className={`nav-link ${!hasProducts ? "text-muted disabled" : ""}`}
                      href={hasProducts ? "#" : undefined}
                      style={{ cursor: hasProducts ? "pointer" : "not-allowed" }}
                    >
                      {category}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
