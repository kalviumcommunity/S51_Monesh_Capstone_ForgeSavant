import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../Styles/home.css";

const Home = () => {
  const slideIn = useSpring({
    from: { transform: "translateX(-20%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
    config: { duration: 1000 },
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
          <h1>Welcome to Forge Savant!</h1>
          <p>
            Forge Savant is your go-to destination for crafting the perfect PC
            tailored to your desires. Whether you're a gaming enthusiast, a
            creative professional, or a tech-savvy user, Forge Savant empowers
            you to build your dream rig effortlessly.
          </p>
      </div>

      <div className="page3 section2">
          <h1>Why Choose Forge Savant?</h1>
      </div>

      <div className="page4 section2">
          <h1>Seamless Component Selection</h1>
          <p>
            Choose from a curated selection of top-tier processors, graphics
            cards, motherboards, RAM, storage, power supplies, and cabinets.
          </p>
      </div>

      <div className="page5 section2">
          <h1>Intelligent Compatibility Checks</h1>
          <p>
            Our cutting-edge compatibility checker ensures that every component
            you select works harmoniously together, eliminating any guesswork.
          </p>
      </div>

      <div className="page6 section2">
          <h1>Real-Time Performance Insights</h1>
          <p>
            Dive into real-time benchmark scores and performance metrics for
            each component, empowering you to make informed decisions.
          </p>
      </div>

      <div className="page7 section2">
          <h1>Intuitive User Interface</h1>
          <p>
            Our user-friendly interface guides you through the PC building
            process, whether you're a novice or an experienced builder.
          </p>
      </div>

      <div className="page8 section2">
          <h1>Compare Your Options</h1>
          <p>
            Compare and contrast multiple components side by side, finding the
            perfect balance between performance, aesthetics, and budget.
          </p>
      </div>
    </div>
  );
};

export default Home;
