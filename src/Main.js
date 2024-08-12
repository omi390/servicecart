// src/Main.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CategoryDetail from './pages/CategoryDetail';
import Profile from './pages/Profile';
import Demo from './pages/demo';
import SubCategoryDisplay from './pages/SubCategoryDisplay';

function Main({currentUser,handleLogin}) {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth handleLogin={handleLogin}/>} />
          <Route path="/category/:id/:name" element={<CategoryDetail />} />  
          <Route path="/profile" element={<Profile/>}/>  
          <Route path="/demo" element={<Demo/>}/> 
          <Route path="/subcategory/services/:id/:name" element={<SubCategoryDisplay/>}/>     
     
        </Routes>
      </div>
  );
}

export default Main;
