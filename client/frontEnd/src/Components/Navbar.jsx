import React from 'react';
import '../Styles/navbar.css';
import logo from "../assets/ForgeSavant1.png";

const NavBar = ({ isNavbarVisible }) => {
  return (
    <nav className={`Navbar ${isNavbarVisible ? 'visible' : ''}`}>
      <div id="left-nav">
        <img src={logo} alt="logo" id="logo" />
      </div>
      <div id="right-nav">
        <h3 id="home">HOME</h3>
        <h3 id="about">ABOUT</h3>
        <button id="login">LOGIN</button>
      </div>
    </nav>
  );
}

export default NavBar;
