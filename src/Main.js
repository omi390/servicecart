// src/Main.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CategoryDetail from './pages/CategoryDetail';
import Profile from './pages/Profile';
import LoginModal from './pages/loginModal';
import SubCategoryDisplay from './pages/SubCategoryDisplay';
import { CheckOutPage } from './pages/CheckOutPage';
import SlotPicker from './pages/SlotPicker';
import BookingOrder from './pages/BookingOrder';
import BookingDetails from './pages/BookingDetails';
// import Paypages/Payment';

function Main({currentUser,handleLogin}) {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth handleLogin={handleLogin}/>} />
          <Route path="/category/:id/:name" element={<CategoryDetail />} />  
          <Route path="/profile" element={<Profile/>}/>  
          <Route path="/loginModal" element={<LoginModal/>}/> 
          <Route path="/subcategory/services/:id/:name" element={<SubCategoryDisplay/>}/> 
          <Route path="/checkOut" element={< CheckOutPage/>}/>  
          <Route path="/tuneSlots" element={<SlotPicker/>}/> 
          <Route path="/bookings" element={<BookingOrder/>}/>
          <Route path="/bookingDetail" element={< BookingDetails/>}/>
  

        </Routes>
      </div>
  );
}

export default Main;
