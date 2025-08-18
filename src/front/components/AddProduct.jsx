"use_client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export const AddProduct = () => {
  const { id } = useParams();                 // <- si existe, estamos editando
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const position = { lat: 41.3872516334326, lng: 2.171430948862673 };
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    location: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(isEdit); // si edit, entonces se cargan los datos

  const categoryOptions = {
    "Deportes de pelota": ["Fútbol", "Baloncesto", "Tennis", "Volleyball", "Golf", "Ping pong", "Pádel", "Otro"],
    "Deportes de agua": ["Surf", "Piragüismo", "Pádel surf", "Ski acuático", "Wakeboard", "Kayak", "Bodyboard", "Otro"],
    "Deportes de montaña": ["Alpinismo", "Trekking", "Acampada", "Senderismo", "Escalada", "Otro"],
    "Deportes sobre ruedas": ["Bicicleta", "MTB", "Skate", "Surf skate", "Patinaje", "Rollerblades", "Motocross", "Motociclismo", "Otro"],
    "Otros deportes": ["Bolos", "Billar", "Otro"]
  };

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          category: data.category ?? "",
          subcategory: data.subcategory ?? "",
          price: String(data.price ?? ""),
          location: data.location ?? ""
        });
      } catch (err) {
        alert("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({ ...form, category: value, subcategory: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category || !form.subcategory || !form.price) {
      setMessage({ type: "error", text: "Rellena todos los campos obligatorios." });
      return;
    }

    const url = isEdit
      ? `${import.meta.env.VITE_BACKEND_URL}api_product/product/${id}`
      : `${import.meta.env.VITE_BACKEND_URL}api_product/set-products`;

    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...form,
      user_id: currentUser.id,
      price: parseFloat(form.price)
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.status === 403) { alert("No puedes editar este producto"); return; }
      if (!response.ok) throw new Error(isEdit ? "Error al guardar cambios" : "Error al crear producto");

      
      const data = await response.json();
      alert(isEdit ? "Cambios guardados" : "Producto creado con éxito");
      navigate(`/products/details/${data.id}`)

      if (!isEdit) {
        setForm({ title: "", description: "", category: "", subcategory: "", price: "", location: "" });
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar.");
    }
  };

  if (loading) return <p>Cargando…</p>;

  return (
    <div>
      {message.text && (
        <div
          style={{
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px"
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input type="text" name="title" placeholder="Título del producto"
          value={form.title} onChange={handleChange} className="w-full border mb-3 px-3 py-2 rounded" />

        <textarea name="description" placeholder="Descripción"
          value={form.description} onChange={handleChange} className="w-full border mb-3 px-3 py-2 rounded" />

        <select name="category" value={form.category} onChange={handleChange}
          className="w-full border mb-3 px-3 py-2 rounded">
          <option value="">Selecciona una categoría</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {form.category && (
          <select name="subcategory" value={form.subcategory} onChange={handleChange}
            className="w-full border mb-3 px-3 py-2 rounded">
            <option value="">Selecciona una subcategoría</option>
            {categoryOptions[form.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        <input type="number" name="price" placeholder="Precio por día (€)"
          value={form.price} onChange={handleChange} className="w-full border mb-3 px-3 py-2 rounded" />

        {/* Input de ubicación arriba del mapa */}
        <input type="text" name="location" placeholder="Ubicación"
          value={form.location} onChange={handleChange} className="w-full border mb-3 px-3 py-2 rounded" />

        <APIProvider apiKey={"AIzaSyAZGZS8YvpJUtpA8KHH5CbnoYUU05xTVak"} onLoad={() => console.log('Maps API loaded')}>
          <div style={{ 
            height: "30vh", 
            width: "100%", 
            borderRadius: "16px", 
            overflow: "hidden", 
            marginBottom: "15px" 
          }}>
            <Map
              defaultZoom={10}
              defaultCenter={position}
              mapId={"2cff1ef28229f873716f5413"}
            >
              <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <Pin />
              </AdvancedMarker>
              {open && (
                <InfoWindow position={position} onClose={() => setOpen(false)}>
                  <p>Barcelona</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>

        <button type="submit" className="btn"
          style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}
          disabled={loading}>
          {loading ? "Guardando..." : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};
