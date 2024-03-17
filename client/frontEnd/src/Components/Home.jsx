import React from "react";
import { Parallax } from "react-parallax";
import "../Styles/home.css";

const Home = () => {
  return (
    <>
      <div id="homepage">
        <div className="body">
          <div id="content">
            <h1 id="content-head">Welcome to the world of <br/> FORGE SAVANT</h1>
            <p id="content-para">
              Discover the perfect components for your DREAM PC with complete
              transparency. Build your ultimate setup confidently, knowing you
              have access to top-quality parts without any hidden surprises.
            </p>
          </div>
        </div>
      </div>

      <div id="appear">
        <h1>COMING SOON...</h1>
      </div>
    </>
  );
};

export default Home;
