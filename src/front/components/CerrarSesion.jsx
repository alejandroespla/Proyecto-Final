import React from 'react';
import { useNavigate } from 'react-router-dom'; // si usas react-router

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar token
    localStorage.removeItem('token');

    // Redirigir a login o página pública
    navigate('/');
  };

  return (
    <span
      style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      onClick={handleLogout}
    >
      Cerrar sesión
    </span>
  );
}
