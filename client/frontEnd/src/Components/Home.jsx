import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../Styles/home.css";
import content1 from "../assets/Content1.png";
import content2 from "../assets/Content2.png";
import logo from "../assets/ForgeSavant1.png";
import menu from "../assets/Menu.png";

const Home = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const animation1 = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const animation2 = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  useEffect(() => {
    const handleToggle = () => {
      setShowSideNav((prev) => !prev);
    };

    document.addEventListener("click", handleToggle);

    return () => {
      document.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <>
      <animated.div style={animation1} className="navbar">
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
      <animated.div style={animation2} className="home-container">
        <div className="content">
          <img src={content1} alt="Content1" className="content1" />
        </div>
        <div className="content">
          <img src={content2} alt="Content2" className="content2" />
        </div>
      </animated.div>
    </>
  );
};

export default Home;
