import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../Styles/navbar.css';
import logo from "../assets/ForgeSavant1.png";
import menu from "../assets/Menu.png";

const NavBar = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <animated.div style={animation} className="navbar"> 
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <p>HOME</p>
          <img
            src={menu}
            alt="Menu"
            className="menu-icon"
            onClick={toggleSideNav}
          />
        </div>
      {showSideNav && (
        <div className="side-navbar">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">COMP</a>
        </div>
      )}
    </animated.div>
  );
};

export default NavBar;
