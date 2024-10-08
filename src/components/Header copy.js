// src/components/Header.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import '../App.css';

function Header() {
    const [currentUser,setCurrentUser] = useState(localStorage.getItem('user'));

    const [showNavbar, setShowNavbar] = useState(false);
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
    };
    const handleLogut =() =>{
      setCurrentUser(null);
      localStorage.removeItem('user');
    }
  return (
      <nav className="navbar">
      <div className="container-header">
        <div className="logo">
          <p className='logoTitle'>Servicecart</p>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Services</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
           {
            currentUser ? (
              <>
                            <li onClick={handleLogut}> logout</li> 

              </>
            ):(
             <>
              <li>
              <NavLink to="/about">
                  <button className='loginBtn'>Login / Register </button>
              </NavLink>
            </li> 
            </>)
             }
             <li>
              <NavLink to="/contact">
                <button className='downloadBtn'>Download Now</button>
              </NavLink>
            </li>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
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
