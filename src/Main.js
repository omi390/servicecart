// src/Main.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CategoryDetail from './pages/CategoryDetail';
function Main() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:id" element={<CategoryDetail />} />         
        </Routes>
      </div>
  );
}

export default Main;
