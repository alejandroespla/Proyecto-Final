"use_client";
import React, { useEffect, useState, createPortal } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIProvider, ControlPosition, MapControl, Map, useMap, useMapsLibrary, AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

import { createRoot } from "react-dom/client";
import { App } from "../components/App.jsx"

export const AddProduct = () => {

  const { id } = useParams();                 // <- si existe, estamos editando
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // Zona de api Google Maps 
  const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? "AIzaSyAZGZS8YvpJUtpA8KHH5CbnoYUU05xTVak";
  const position = { lat: 41.3872516334326, lng: 2.171430948862673 };
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

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
        <APIProvider
          apiKey={API_KEY}
          solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        >
          <Map
            mapId={"2cff1ef28229f873716f5413"}
            defaultZoom={9}
            defaultCenter={position}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <AdvancedMarker ref={markerRef} position={null} />
          </Map>
          <MapControl position={ControlPosition.TOP}>
            <div className="autocomplete-control">
              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            </div>
          </MapControl>
          <Maphandler place={selectedPlace} marker={marker} />

        </APIProvider>
        );
        {/* Input de ubicación arriba del mapa */}
        <input type="text" id="autocomplete" placeholder="Ubicación"
          /*value={form.location} onChange={handleChange} */ className="w-full border mb-3 px-3 py-2 rounded" />

        <button type="submit" className="btn"
          style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color: "#ffffff" }}
          disabled={loading}>
          {loading ? "Guardando..." : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};
const Maphandler = ({ place, marker }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || !place || !marker) return;
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.location);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);
  return null;
}
const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useState(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);
  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);
  return (
    <div className="autocomplete-container">
      <input value={inputRef} />
    </div>
  );
}