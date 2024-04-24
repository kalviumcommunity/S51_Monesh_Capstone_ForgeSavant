import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import "../Styles/home.css";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const slideIn = useSpring({
    from: { transform: "translateX(-20%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
    config: { duration: 1000 },
  });

  const appearIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: isVisible ? 1 : 0 },
    config: { duration: 500 },
  });

  return (
    <>
      <div className="Display">
        <div className="MainBody">
          <div className="marquee">
            <span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span>
            <span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span>
          </div>
          <div className="BrandName"><h1>Forge Savant</h1></div>
          <div className="marquee">
            <span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span>
            <span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span><span>| Explicit Content</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
