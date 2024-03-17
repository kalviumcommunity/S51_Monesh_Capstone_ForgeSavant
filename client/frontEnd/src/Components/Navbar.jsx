import React from 'react';
import '../Styles/navbar.css';
import logo from "../assets/ForgeSavant1.png";

const NavBar = () => {
  return (
    <nav className="Navbar">
      <div id="left-nav">
        <img src={logo} alt="logo" id="logo" />
      </div>
      <div id="right-nav">
        <h3 className="nav-item">HOME</h3>
        <h3 className="nav-item">ABOUT</h3>
        <button className="nav-button">LOGIN</button>
      </div>
    </nav>
  );
}

export default NavBar;
