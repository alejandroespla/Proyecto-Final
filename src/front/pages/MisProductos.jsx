// src/front/js/pages/MyProducts.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cyclist_bycicle from "../assets/img/cyclist_bycicle.jpg";

export const MisProductos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    const handleDelete = async () => {
      const ok = window.confirm("¿Seguro que quieres eliminar este producto?");
      if (!ok) return;
        else{

        }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUser.id }) // provisional (mejor JWT en backend)
        });

        if (res.status === 403) {
          alert("No puedes eliminar este producto.");
          return;
        }
        if (!res.ok) throw new Error("Error al eliminar");

        alert("Producto eliminado");
        navigate("/"); 
      } catch (e) {
        console.error(e);
        alert("No se pudo eliminar el producto.");
      } finally {
        setDeleting(false);
      }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    // fallback: por si estás guardando el usuario completo
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const fetchMyProducts = async () => {
      try {
        let url = `${import.meta.env.VITE_BACKEND_URL}/api_product/user-products`;
        let options = {};

        if (token) {
          options.headers = { Authorization: `Bearer ${token}` };
        } else if (user?.id) {
        //como no funciona con el jwt entra aqui
          url = `${import.meta.env.VITE_BACKEND_URL}/api_product/users/${user.id}/products`;
        } else {
          navigate("/login");
          return;
        }

        const res = await fetch(url, options);
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [`${import.meta.env.VITE_BACKEND_URL}`, navigate]);

  if (loading) return <div className="container my-5">Cargando…</div>;

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Mis productos</h2>
        <Link to="/add-product" className="btn btn-primary">Añadir producto</Link>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info">
          Aún no has publicado productos.
        </div>
      ) : (
        <div className="row g-3">
          {items.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <div className="card h-100">
                <img src={cyclist_bycicle} className="card-img-top" alt={p.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text small text-muted mb-1">{p.category}</p>
                  <p className="card-text fw-semibold mb-2">{Number(p.price).toFixed(2)} €</p>

                  <div className="mt-auto d-flex gap-2">
                    <Link to={`/products/details/${p.id}`} className="btn btn-sm btn-outline-secondary w-100">Ver</Link>
                    <Link to={`/products/${id}/edit`} className="btn btn-sm btn-outline-primary w-100">Editar</Link>
                    <button onClick={()=>handleDelete(p.id)} className="btn btn-sm btn-outline-danger">Borrar</button> 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
