// src/Main.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CategoryDetail from './pages/CategoryDetail';
import Profile from './pages/Profile';

function Main({currentUser,handleLogin}) {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth handleLogin={handleLogin}/>} />
          <Route path="/category/:id" element={<CategoryDetail />} />  
          <Route path="/profile" element={<Profile/>}/>       
        </Routes>
      </div>
  );
}

export default Main;
