// Import necessary components and functions from react-router-dom.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";

import {AddProduct} from "./components/AddProduct.jsx"
import { ForgotPassword } from "./pages/RecuperarPassword.jsx";
import { ResetPassword } from "./pages/ResetearPassword.jsx";
import { MiPerfil } from "./pages/MiPerfil.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ForgotPassword />} path="/forgot-password" />
        {/* Ahora aceptamos el token en la URL */}
        <Route element={<ResetPassword />} path="/reset-password" />

        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<AddProduct />} />
        <Route path="/products/details" element={<ProductDetail />} />
        

        <Route path="/user" element={<MiPerfil />} />
      </Route>
    </>
  )
);
