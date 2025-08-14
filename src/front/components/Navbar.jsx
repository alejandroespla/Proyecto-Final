import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LogoutButton } from "./CerrarSesion.jsx";
import { AddProductModal } from "../components/AddProductModal";
import "../styles/Navbar.css";
import productos from "../assets/img/productos.png"

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");

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

  const handleCategoryClick = (category) => {
    if (category === "Todas las categorías" || (categoriesData[category] && categoriesData[category].length > 0)) {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-0 ">
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
                    <span style={{ fontSize: "0.8rem", userSelect: "none" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2E676A" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                      </svg>
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton" style={{ padding: "16px", borderRadius: "24px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
                    <li className="d-flex align-items-center dropdown-item" style={{ height: "40px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                      </svg>
                      <Link className="dropdown-item" to="/user">Mi perfil</Link>
                    </li>

                    <li className="d-flex align-items-center dropdown-item mb-3" style={{ height: "40px" }}>
                      <img
                        src={productos}
                        alt="Productos"
                        style={{ width: "24px", height: "24px", objectFit: "contain" }}
                      />
                      <Link className="dropdown-item" to="/my-products">Mis productos</Link>
                    </li>

                    <li className="d-flex align-items-center dropdown-item" style={{ height: "40px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                      </svg>
                      <LogoutButton dispatch={dispatch} />
                    </li>
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

      {/* Navbar categorías */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary navegacion">
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
                const hasProducts =
                  category === "Todas las categorías" ||
                  (categoriesData[category] && categoriesData[category].length > 0);

                const isSelected = selectedCategory === category;

                return category === "Otros Deportes" ? (
                  <li key={category} className="nav-item dropdown border-categoria">
                    <a
                      className={`nav-link dropdown-toggle category-link ${isSelected ? "selected" : ""} ${!hasProducts ? "text-muted disabled" : ""
                        }`}
                      href="#"
                      role="button"
                      data-bs-toggle={hasProducts ? "dropdown" : undefined}
                      aria-expanded="false"
                      style={{ cursor: hasProducts ? "pointer" : "not-allowed" }}
                      onClick={() => handleCategoryClick(category)}
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
                            className={`dropdown-item category-link ${categoriesData[category]?.includes(sub) ? "" : "text-muted disabled"
                              }`}
                            href="#"
                            onClick={() => handleCategoryClick(sub)}
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
                      className={`nav-link category-link ${isSelected ? "selected" : ""} ${!hasProducts ? "text-muted disabled" : ""
                        }`}
                      href={hasProducts ? "#" : undefined}
                      style={{ cursor: hasProducts ? "pointer" : "not-allowed" }}
                      onClick={() => handleCategoryClick(category)}
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
