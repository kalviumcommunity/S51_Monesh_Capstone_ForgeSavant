import React from "react";
import "../Styles/home.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Background from "../assets/Background.svg";

const Home = () => {
  return (
    <>
      <Parallax pages={2} style={{ height: "100vh" }}>
        <ParallaxLayer
          offset={0}
          speed={0.7}
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></ParallaxLayer>
        <ParallaxLayer offset={0} speed={1.5}>
          <div className="parallax-wrapper" aria-label="Forge Savant Introduction">
            <div className="content">
              <h1 className="content-head">
                Welcome to the world of <br />
                FORGE SAVANT
              </h1>
              <p className="content-para">
                Discover the perfect components for your DREAM PC with complete
                transparency. Build your ultimate setup confidently, knowing you
                have access to top-quality parts without any hidden surprises.
              </p>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={2.5}>
          <div className="coming-soon">
            <h1>Coming Soon...</h1>
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Home;
