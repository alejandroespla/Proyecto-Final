import React, { useState} from "react";


export const AddProduct = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = {
    "Deportes de pelota": ["Fútbol", "Baloncesto", "Tennis", "Volleyball", "Golf", "Ping pong", "Pádel", "Otro"],
    "Deportes de agua": ["Surf", "Piragüismo", "Pádel surf", "Ski acuático", "Wakeboard", "Kayak", "Bodyboard", "Otro"],
    "Deportes de montaña": ["Alpinismo", "Trekking", "Acampada", "Senderismo", "Escalada", "Otro"],
    "Deportes sobre ruedas": ["Bicicleta", "MTB", "Skate", "Surf skate", "Patinaje", "Rollerblades", "Motocross", "Motociclismo", "Otro"],
    "Otros deportes": ["Bolos", "Billar", "Otro"]
  };

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
      alert("Rellena todos los campos obligatorios.");
      return;
    }

    const payload = {
      ...form,
      user_id: currentUser.id,
      price: parseFloat(form.price)
    };

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error al crear producto");

      const data = await response.json();
      alert("Producto creado con éxito");

      setForm({
        title: "",
        description: "",
        category: "",
        subcategory: "",
        price: "",
        location: ""
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="my-5">Publicar nuevo producto</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column mb-5">
        <input
          type="text"
          name="title"
          placeholder="Título del producto"
          value={form.title}
          onChange={handleChange}
          className="w-full border mb-5 px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full border mb-5 px-3 py-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border mb-5 px-3 py-2 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {form.category && (
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className="w-full border mb-5 px-3 py-2 rounded"
          >
            <option value="">Selecciona una subcategoría</option>
            {categoryOptions[form.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}
        <input
          type="number"
          name="price"
          placeholder="Precio por día (€)"
          value={form.price}
          onChange={handleChange}
          className="w-full border mb-5 px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={form.location}
          onChange={handleChange}
          className="w-full border mb-5 px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="btn" style={{ backgroundColor: "#2E676A", border: "none", borderRadius: "8px", color:"#ffffff" }}>
            Añadir producto
        </button>
      </form>
    </div>
  );
};

