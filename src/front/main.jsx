import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider, useGlobalReducer } from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainApp = () => {
  const { dispatch } = useGlobalReducer();

  // Cargar usuario desde sessionStorage al iniciar
  useEffect(() => {
    const userFromStorage = sessionStorage.getItem("currentUser");
    if (userFromStorage) {
      dispatch({ type: "set_current_user", payload: JSON.parse(userFromStorage) });
    }
  }, []);

  if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
    return (
      <React.StrictMode>
        <BackendURL />
      </React.StrictMode>
    );
  }

  return <RouterProvider router={router} />;
};

const Main = () => (
  <React.StrictMode>
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
