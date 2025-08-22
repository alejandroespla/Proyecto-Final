import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LogoutButton } from "./CerrarSesion.jsx";
import { AddProductModal } from "../components/AddProductModal";
import "../styles/Navbar.css";
import productos from "../assets/img/productos.png";



export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // controlar qué menú está abierto

  // Categorías y subcategorías fijas
  const categoriesData = {
    "Todas las categorías": [],
    "Deportes de pelota": ["Fútbol", "Baloncesto", "Tennis", "Volleyball", "Golf", "Ping pong", "Pádel", "Otro"],
    "Deportes de agua": ["Surf", "Piragüismo", "Pádel surf", "Ski acuático", "Wakeboard", "Kayak", "Bodyboard", "Otro"],
    "Deportes de montaña": ["Alpinismo", "Trekking", "Acampada", "Senderismo", "Escalada", "Otro"],
    "Deportes sobre ruedas": ["Bicicleta", "MTB", "Skate", "Surf skate", "Patinaje", "Rollerblades", "Motocross", "Motociclismo", "Otro"],
    "Otros deportes": ["Bolos", "Billar", "Otro"],
  };

  const allCategories = [
    "Todas las categorías",
    "Deportes de pelota",
    "Deportes de agua",
    "Deportes de montaña",
    "Deportes sobre ruedas",
    "Otros deportes",
  ];

  // Mantener sesión de usuario
  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setOpenDropdown(openDropdown === category ? null : category);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      setOpenDropdown(category);
    }
  };

  const handleSubcategoryClick = (subcat) => {
    setSelectedSubcategory(subcat);
    setSelectedCategory(selectedCategory);
    setOpenDropdown(null);
  };

  const products = store.products || [];
  const categoryHasProducts = (category, subcat = null) => {
    if (category === "Todas las categorías") return products.length > 0;
    return products.some((p) => {
      if (subcat) return p.subcategoria === subcat;
      return p.categoria === category;
    });
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-0">
        <div className="container-fluid d-flex align-items-center" style={{ maxWidth: "1700px" }}>
          <Link className="navbar-brand pt-0 d-flex align-items-center" to="/">
            <img className="imgLogo" src="src/front/assets/img/logo.png" alt="Logo" />
          </Link>

          {/* Barra de búsqueda */}
          <div className="searchBox" style={{ flexGrow: 1, maxWidth: "1440px", margin: "0 auto" }}>
            <form className="w-100 d-flex align-items-center">
              <input type="search" className="w-100 searchBox_input" placeholder="Buscar" />
            </form>
          </div>

          {/* Menú usuario */}
          <div className="d-flex align-items-center gap-3 m-3">
            {currentUser ? (
              <>
                <AddProductModal />

                <div className="dropdown">
                  <button
                    type="button"
                    className="d-flex align-items-center gap-2"
                    style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
                    onClick={() => setOpenDropdown(openDropdown === "user" ? null : "user")}
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
                  </button>

                  {openDropdown === "user" && (
                    <ul
                      className="dropdown-menu dropdown-menu-start p-3 show"
                      style={{ borderRadius: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    >
                      <li className="d-flex align-items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                        <Link className="dropdown-item ms-2" to="/user">
                          Mi perfil
                        </Link>
                      </li>

                      <li className="d-flex align-items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                        </svg>
                        <Link
                          className="dropdown-item ms-2"
                          to="/inbox"
                          onClick={() => {
                            // marcar todos los mensajes como leídos en el store
                            dispatch({ type: "mark_all_messages_read" });
                          }}
                        >
                          Inbox
                        </Link>
                      </li>


                      <li className="d-flex align-items-center mb-2">
                        <img src={productos} alt="Productos" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        <Link className="dropdown-item ms-2" to="/my-products">
                          Mis productos
                        </Link>
                      </li>

                      <li className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                          />
                        </svg>
                        <LogoutButton dispatch={dispatch} />
                      </li>
                    </ul>
                  )}
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
                const subcats = categoriesData[category];
                const isSelected = selectedCategory === category;
                const isOpen = openDropdown === category;
                const enabled = categoryHasProducts(category);

                if (category === "Todas las categorías") {
                  return (
                    <li key={category} className="nav-item border-categoria">
                      <button
                        type="button"
                        className={`nav-link ${isSelected ? "active" : ""}`}
                        onClick={() => handleCategoryClick(category)}
                        style={{ border: "none", background: "transparent" }}
                        disabled={!enabled}
                      >
                        {category}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={category} className="nav-item border-categoria dropdown">
                    <button
                      className={`nav-link dropdown-toggle ${isSelected ? "active" : ""}`}
                      type="button"
                      onClick={() => handleCategoryClick(category)}
                      style={{ border: "none", background: "transparent" }}
                      disabled={!enabled}
                    >
                      {category}
                    </button>
                    {isOpen && subcats.length > 0 && (
                      <ul className="dropdown-menu show">
                        {subcats.map((subcat) => (
                          <li key={subcat}>
                            <button className="dropdown-item" onClick={() => handleSubcategoryClick(subcat)}>
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
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
