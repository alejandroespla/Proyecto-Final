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
import {MisProductos} from "./pages/MisProductos.jsx";

import { AddProduct } from "./components/AddProduct.jsx";
import { ForgotPassword } from "./pages/RecuperarPassword.jsx";
import { ResetPassword } from "./pages/ResetearPassword.jsx";
import { MiPerfil } from "./pages/MiPerfil.jsx";
import { CardProducto } from "./components/CardProducto.jsx";

import { Inbox } from "./pages/Inbox.jsx";
import { Message } from "./pages/Message.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ForgotPassword />} path="/forgot-password" />
        
        <Route element={<ResetPassword />} path="/reset-password" />

        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<AddProduct />} />
        <Route path="/products/details/:id" element={<CardProducto />} />
        <Route path="/mis-productos" element={<MisProductos/>}/>

        <Route path="/user" element={<MiPerfil />} />

        {/* Nuevas rutas de mensajes */}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/message/:messageId" element={<Message />} />
      </Route>
    </>
  )
);
