import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton({ dispatch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user');
    dispatch({ type: "set_current_user", payload: null }); // limpiar estado global
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
