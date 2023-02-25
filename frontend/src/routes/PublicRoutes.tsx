import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import { Login } from "../pages/Login/Login";

export default function PublicRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}