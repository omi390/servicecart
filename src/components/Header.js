// src/components/Header.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import SearchModal from '../pages/SearchModal';
// import {handleSearchModal} from '../App'; 

import '../App.css';

function Header({isModalOpen,currentUser,handleLogut,handleOpenLoginModal,handleSearchModal}) {

    const [showNavbar, setShowNavbar] = useState(false);

    const zoneName = localStorage.getItem('zoneName');
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
    };
 
    const openLocationModal = () => {
      isModalOpen(true);
    };
  return (
      <nav className="navbar">
      <div className="container-header">
        <div className="logo"  style={{ display: 'flex', alignItems: 'center' }}>
          <p className='logoTitle'>Servicecart</p>
        
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
            <div onClick={openLocationModal} style={{ display: 'flex', alignItems: 'center' }}>
                <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                <span className='locationSpan'>{zoneName}</span>
                <IoIosArrowDown style={{ marginLeft: '3px' }} />
            </div>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
           
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
           {
            currentUser ? (
              <>


              </>
            ):(
              <>
              <li>
              <NavLink to="/##" onClick={handleOpenLoginModal}>
                  <p className='loginBtn'>Login / Register </p>
              </NavLink>
            </li> 
            </>
            )
             }
             
             <li>
              <NavLink to="/contact">
             <FiSearch  onClick={handleSearchModal}/>
             
              </NavLink>
            </li>
            <li style={{padding:"5px",marginRight:"5px",alignContent:"center"}}><MdOutlineShoppingCart />
            </li>

            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
              <CgProfile />

              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </ul>
        </div>
      </div>
    </nav>
   
  );
}

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

export default Header;
