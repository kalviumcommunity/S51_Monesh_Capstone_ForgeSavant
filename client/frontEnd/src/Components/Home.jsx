import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import "../Styles/home.css";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slideIn = useSpring({
    from: { transform: "translateX(-10%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
    config: { duration: 1000 },
  });

  const appearIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <>
      <div className="Display">
        <div className="MainBody" style={{ transform: `translateY(-${scrollY * 0.1}px)` }}>
          <animated.div style={appearIn} className="marquee marquee1">
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
          </animated.div>
          <animated.div style={slideIn} className="BrandName"><h1>Forge Savant</h1></animated.div>
          <animated.div style={appearIn} className="marquee marquee2">
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
          </animated.div>
        </div>
      </div>
      <div className="secondPage">
        <div className="secondBody">
      <animated.div style={appearIn} className="marquee marquee1">
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
          </animated.div>
          <animated.div style={slideIn}><h1>On Progress</h1></animated.div>
          <animated.div style={appearIn} className="marquee marquee2">
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
            <span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span><span>| Electrical Hazard&nbsp;</span>
          </animated.div>
          </div>
      </div>
    </>
  );
};

export default Home;
