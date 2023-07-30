import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./component/Login";
import UserPages from "./pages/User";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Produk from "./pages/Produk";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserPages />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/products" element={<Produk />} />
        <Route path="/products/add" element={<AddProduk />} />
        <Route path="/products/edit/:id" element={<EditProduk />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
