import React, { useState } from 'react';
import "../styles/register.css";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';

    if (!form.password) newErrors.password = 'La contraseña es obligatoria';
    if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';

    if (!form.terms) newErrors.terms = 'Debes aceptar los términos';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setMessage('Registro exitoso. Redirigiendo...');
          // Aquí podrías redirigir a login
        } else {
          const data = await response.json();
          setMessage(data.error || 'Error al registrar');
        }
      } catch (error) {
        setMessage('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name && 'is-invalid'}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <div className="form-check mb-3">
          <input
            className={`form-check-input ${errors.terms && 'is-invalid'}`}
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Acepto los términos y condiciones
          </label>
          {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
