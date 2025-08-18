import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Banner } from "../components/Banner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SectionCard } from "../components/SectionCard.jsx";
import { Footer } from "../components/Footer.jsx";
import { SubsectionCard } from "../components/SubsectionCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";
import { useLocation } from "react-router-dom"; // 👈 para saber la ruta actual

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/products`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "set_products", payload: data });
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Loader de tarjetas
  const renderSkeletonCards = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100">
            <Skeleton height={180} />
            <div className="card-body">
              <Skeleton height={20} width="80%" style={{ marginBottom: "8px" }} />
              <Skeleton height={15} count={2} />
            </div>
            <div className="card-footer">
              <Skeleton height={30} width="50%" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-body-tertiary">
        <Navbar />
      </div>

      {/* Banner SOLO en Home (ruta "/") y SOLO si no hay usuario */}
      {location.pathname === "/" && !store.currentUser && (
        <div className="mb-5">
          <Banner />
        </div>
      )}

      {/* Categorías / Productos */}
      <div className="container my-5">
        {loading ? (
          <div className="row">{renderSkeletonCards(8)}</div>
        ) : store.products.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">No existen productos aún</h5>
          </div>
        ) : (
          <div>
            {categories.map((cat, index) => (
              <SectionCard
                key={index}
                title={cat.category}
                image={null}
                reverse={false}
              >
                {cat.products.map((product) => (
                  <SubsectionCard
                    key={product.id}
                    id={product.id}
                    image={cyclist_bycicle}
                    title={product.title}
                    price={`${product.price}€/día`}
                  />
                ))}
              </SectionCard>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const initialStore = () => {
  return {
    currentUser: null,
    products: [],
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_current_user":
      return { ...store, currentUser: action.payload };
    case "add_product":
      return { ...store, products: [...store.products, action.payload] };
    case "set_products":
      return { ...store, products: action.payload };
    default:
      console.error("Unknown action:", action.type);
      return store;
  }
}
