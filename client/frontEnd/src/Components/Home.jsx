import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../Styles/home.css";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageElements = document.querySelectorAll(".section2");

      pageElements.forEach((element) => {
        const elementOffset = element.offsetTop;
        if (currentScrollY > elementOffset - windowHeight / 2) {
          setIsVisible(true);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div style={{ overflow: "hidden" }}>
      <div className="page1">
        <animated.div style={slideIn}>
          <h1>Forge</h1>
          <h1>Savant</h1>
        </animated.div>
      </div>

      <div className="page2 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Welcome to Forge Savant!</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Forge Savant is your go-to destination for crafting the perfect PC
          tailored to your desires. Whether you're a gaming enthusiast, a
          creative professional, or a tech-savvy user, Forge Savant empowers
          you to build your dream rig effortlessly.
        </animated.p>
      </div>

      <div className="page3 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Why Choose Forge Savant?</animated.h1>
      </div>

      <div className="page4 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Seamless Component Selection</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Choose from a curated selection of top-tier processors, graphics
          cards, motherboards, RAM, storage, power supplies, and cabinets.
        </animated.p>
      </div>

      <div className="page5 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Intelligent Compatibility Checks</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Our cutting-edge compatibility checker ensures that every component
          you select works harmoniously together, eliminating any guesswork.
        </animated.p>
      </div>

      <div className="page6 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Real-Time Performance Insights</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Dive into real-time benchmark scores and performance metrics for
          each component, empowering you to make informed decisions.
        </animated.p>
      </div>

      <div className="page7 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Intuitive User Interface</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Our user-friendly interface guides you through the PC building
          process, whether you're a novice or an experienced builder.
        </animated.p>
      </div>

      <div className="page8 section2">
        <animated.h1 style={isVisible ? appearIn : {}}>Compare Your Options</animated.h1>
        <animated.p style={isVisible ? appearIn : {}}>
          Compare and contrast multiple components side by side, finding the
          perfect balance between performance, aesthetics, and budget.
        </animated.p>
      </div>
    </div>
  );
};

export default Home;
