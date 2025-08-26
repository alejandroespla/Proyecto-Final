import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Banner } from "../components/Banner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SectionCard } from "../components/SectionCard.jsx";
import { Footer } from "../components/Footer.jsx";
import { SubsectionCard } from "../components/SubsectionCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Imágenes productos
import image_not_found from "../assets/img/ImageNotFound.png";
import pelota from "../assets/img/pelota.png";
import pelota2 from "../assets/img/pelota2.jpg";
import pelota3 from "../assets/img/pelota3.png";
import agua1 from "../assets/img/agua1.png";
import agua2 from "../assets/img/agua2.jpg";
import agua3 from "../assets/img/agua3.jpg";
import mountain from "../assets/img/mountain.jpg";
import mountain2 from "../assets/img/mountain2.jpg";
import mountain3 from "../assets/img/mountain3.png";
import ruedas from "../assets/img/ruedas.jpg";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";
import mountain_bike from "../assets/img/mountain_bike.jpg";
import otros1 from "../assets/img/otros1.png";
import otros2 from "../assets/img/otros2.png";
import otros3 from "../assets/img/otros3.jpg";

const imagesByCategory = {
  "deportes de pelota": [pelota2, pelota3, pelota],
  "deportes de agua": [agua1, agua2, agua3],
  "deportes de montaña": [mountain, mountain2, mountain3],
  "deportes sobre ruedas": [mountain_bike, ruedas, cyclist_bycicle],
  "otros deportes": [otros1, otros2, otros3],
};
const normalizeCategory = cat => (cat || "").trim().toLowerCase();

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { store, dispatch } = useGlobalReducer();

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
      {/* Banner solo si NO hay usuario logeado */}
      <div className="mb-5">
        {!store.currentUser && <Banner />}
      </div>
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
            {categories.map((cat, index) => {
              const imgArray = imagesByCategory[normalizeCategory(cat.category)] || [image_not_found, image_not_found, image_not_found];
              return (
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
                      images={imgArray}
                      title={product.title}
                      price={`${product.price}€/día`}
                    />
                  ))}
                </SectionCard>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};
