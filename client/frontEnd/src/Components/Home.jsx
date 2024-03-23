import React from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSpring, animated } from "@react-spring/web";
import "../Styles/home.css";
import content1 from '../assets/Content1.png';
import content2 from '../assets/Content2.png';

const Home = () => {
  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <>
      <animated.div style={animation} className="home-container">
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
