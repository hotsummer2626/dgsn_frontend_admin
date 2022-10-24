import React from "react";
import "./global.scss";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path="brands" element={<Brands />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
