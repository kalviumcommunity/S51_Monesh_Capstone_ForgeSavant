import React, { useState, useEffect, useRef } from "react";
import "../Styles/home.css";
import firstImage from "../assets/build_from_scratch.png";
import secondImage from "../assets/Custom_PC.png";
import thirdImage from "../assets/CyberPunk.png";
import insta from "../assets/instagram.png";
import linkedin from "../assets/LinkedIn.png";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollToAbout = () => {
      const url = new URL(window.location);
      if (url.hash === '#about') {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleScrollToAbout);
    return () => window.removeEventListener('hashchange', handleScrollToAbout);
  }, []);

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      window.location.hash = 'about';
    } else {
      navigate('/#about');
    }
  };

  return (
    <>
      <div className="Display">
        <div
          className="MainBody"
          style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
        >
          <div className="marquee marquee1">
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
          </div>
          <div className="BrandName">
            <h1>Forge Savant</h1>
          </div>
          <div className="marquee marquee2">
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span>
          </div>
        </div>
      </div>
      <div ref={aboutRef} className="secondPage">
        <div className="FirstSection section parallax">
          <p style={{ transform: `translateY(-${scrollY * 0.1}px)` }}>
            Building a custom PC can be a daunting task, especially without
            detailed knowledge of hardware components and compatibility issues.
            The process often involves extensive research, comparing
            specifications, and understanding the intricate details of each
            part.
          </p>
          <div style={{ transform: `translateY(-${scrollY * 0.03}px)` }}>
            <img
              src={firstImage}
              alt="Build from scratch"
              style={{ transform: `translateY(-${scrollY * 0.02}px)` }}
            />
          </div>
        </div>
        <div className="secondSection section parallax">
          <div style={{ transform: `translateY(-${scrollY * 0.06}px)` }}>
            <img
              src={secondImage}
              alt="Custom PC"
              style={{ transform: `translateY(-${scrollY * 0.02}px)` }}
            />
          </div>
          <p style={{ transform: `translateY(-${scrollY * 0.09}px)` }}>
            That's where ForgeSavant comes in. Our platform is designed to
            simplify the custom PC building experience, making it accessible to
            everyone, regardless of their technical expertise.
          </p>
        </div>
        <div className="thirdSection section parallax">
          <p style={{ transform: `translateY(-${scrollY * 0.1}px)` }}>
            With ForgeSavant, you can build your custom PC easily and
            confidently. Our platform not only helps you select the best
            components but also provides real-time insights into the performance
            and price of your build.
          </p>
          <div style={{ transform: `translateY(-${scrollY * 0.06}px)` }}>
            <img
              src={thirdImage}
              alt="CyberPunk"
              style={{ transform: `translateY(-${scrollY * 0.02}px)` }}
            />
          </div>
        </div>
        <div className="footer">
          <div className="footer-top">
            <div className="footer-top-second">
              <h1>For Contact</h1>
              <p>✉️ 2005.monesh@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} ForgeSavant. All rights
              reserved.
            </p>
            <div>
              <p>Follow Us</p>
              <img src={insta} alt="" style={{ backgroundColor: "black" }} />
              <img src={linkedin} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
