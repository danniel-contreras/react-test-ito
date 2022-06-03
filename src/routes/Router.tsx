import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "../pages/Detail";
import { Favorites } from "../pages/Favorites";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
