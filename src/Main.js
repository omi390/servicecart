// src/Main.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CategoryDetail from './pages/CategoryDetail';
import Profile from './pages/Profile';

function Main({currentUser,handleLogin}) {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About handleLogin={handleLogin}/>} />
          <Route path="/category/:id" element={<CategoryDetail />} />  
          <Route path="/profile" element={<Profile/>}/>       
        </Routes>
      </div>
  );
}

export default Main;
