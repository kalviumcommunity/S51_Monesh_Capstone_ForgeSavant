import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import logo from "../assets/ForgeSavant1.png";
import "../Styles/signup.css";

function Signup() {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const rightSideAnimation = useSpring({
    transform: isLoginPage ? "translateX(-70%)" : "translateX(0%)",
    zIndex: isLoginPage ? 1 : 0,
    config: { duration: 400 }
  });

  const leftSideAnimation = useSpring({
    transform: isLoginPage ? "translateX(150%)" : "translateX(0%)",
    zIndex: isLoginPage ? 0 : 1,
    config: { duration: 400 }
  });

  const toggleLoginPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="Signup">
      <animated.div className="left-side" style={{ ...leftSideAnimation, backgroundColor: 'white' }}>
        <img src={logo} alt="logo" className="logo" />
      </animated.div>
      <animated.div className="right-side" style={{ ...rightSideAnimation, backgroundColor: 'black' }}>
        <animated.div className="head">
          <h3>{isLoginPage ? "Welcome Back!" : "Hello!"}</h3>
          <p className="signup-text">
            {isLoginPage ? "Login to your account" : "Sign up to get started"}
          </p>
        </animated.div>
        {isLoginPage ? (
          <>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="register">Login</button>
            <a href="#!" id="sign-in" onClick={toggleLoginPage}>
              Don't have an account? Sign up here.
            </a>
          </>
        ) : (
          <>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="register">Register</button>
            <a href="#!" id="sign-in" onClick={toggleLoginPage}>
              Already have an account? Login here.
            </a>
          </>
        )}
      </animated.div>
    </div>
  );
}

export default Signup;
