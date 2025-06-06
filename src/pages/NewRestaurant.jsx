import React, { useState } from "react";
import { addRestaurant } from "../services/FirebaseRestaurantService";
import { useNavigate } from "react-router-dom";

const NewRestaurant = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    image: "",
    link: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.name || !form.description || !form.address) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      await addRestaurant(form);
      navigate("/"); // redirige al home
    } catch (err) {
      console.error(err);
      setError("Error al guardar el restaurante.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Nuevo Restaurante</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre*</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción*</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección*</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input
            type="url"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/imagen.jpg"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enlace al restaurante (URL)</label>
          <input
            type="url"
            className="form-control"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://restaurante.com"
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Guardar Restaurante
        </button>
      </form>
    </div>
  );
};

export default NewRestaurant;








