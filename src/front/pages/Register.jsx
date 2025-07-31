import React, { useState, useEffect } from 'react';
import '../styles/register.css'; 
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [backgroundUrl, setBackgroundUrl] = useState('');

  const backgrounds = [
    "https://static.nationalgeographic.es/files/styles/image_3200/public/gettyimages-1272468011.webp?w=1600&h=1068",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEPT9_GDJ1885ZHKbBP0AYr1dCFIcGJF9o8w&s",
    "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/whoinventedfootball?_a=BAVAZGDX0",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundUrl(backgrounds[randomIndex]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.username.trim()) newErrors.username = 'El nombre de usuario obligatorio';
    if (!form.fullname.trim()) newErrors.fullname = 'El nombre es obligatorio';
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
        const response = await fetch('https://probable-eureka-xg7gw47977j2pr7j-3001.app.github.dev/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        setMessage(response.ok ? 'Registro exitoso' : data.error || 'Error al registrar');
        // Redirigir si el registro fue exitoso
        if (response.ok) window.location.href = "/login";
      } catch (error) {
        setMessage('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div
      className="min-vh-100 w-100 d-flex justify-content-start align-items-start"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "3rem 2rem"
      }}
    >
      <div className="register-card bg-white bg-opacity-75 p-4 rounded shadow">
        <Link to={"/"} >
        <img className="mx-auto d-block mb-3"  
					 src="../src/front/assets/img/logo.png" 
					 style={{ maxWidth: "280px", width: "100%", borderRadius:"24px"}} 
					 alt="Logo"
				/>
        </Link>
        <h2 className="text-left mb-5">Registro</h2>
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.name && 'is-invalid'}`}
              value={form.username}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              name="fullname"
              className={`form-control ${errors.fullname && 'is-invalid'}`}
              value={form.fullname}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.fullname}</div>}
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
            <label className="form-check-label">Acepto los términos y condiciones</label>
            {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Registrarse
          </button>
        </form>

        <div className="text-center">
          <small className="me-1">¿Ya tienes cuenta?</small>
          <Link to="/login">
            <small>Inicia sesión</small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
