import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/ForgeSavant1.png";
import "../Styles/signup.css";

function Signup() {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const slideInRight = {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(0%)" },
  };

  const slideInLeft = {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
  };

  const rightSideAnimation = useSpring({
    to: { transform: isLoginPage ? "translateX(-70%)" : "translateX(0%)" },
    config: { duration: 600 },
    from: slideInRight,
    reset: true,
  });

  const leftSideAnimation = useSpring({
    to: {
      transform: isLoginPage ? "translateX(140%)" : "translateX(0%)",
      zIndex: 1,
    },
    config: { duration: 700 },
    from: slideInLeft,
    reset: true,
  });

  const toggleLoginPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Signup">
      <animated.div
        className="left-side"
        style={{ ...leftSideAnimation, backgroundColor: "white" }}
      >
        <img src={logo} alt="logo" className="logo" />
      </animated.div>
      <animated.div
        className="right-side"
        style={{ ...rightSideAnimation, backgroundColor: "black" }}
      >
        <animated.div className="head">
          <h3>{isLoginPage ? "Welcome Back!" : "Hello!"}</h3>
          <p className="signup-text">
            {isLoginPage ? "Login to your account" : "Sign up to get started"}
          </p>
        </animated.div>
        <form onSubmit={handleFormSubmit} className="form">
          {isLoginPage ? (
            <>
              <input
                type="text"
                name="email"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
              <button type="submit" className="register">
                Login
              </button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <button
                type="button"
                onClick={toggleLoginPage}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Don't have an account? Sign up here.
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                aria-label="Full Name"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
              <button type="submit" className="register">
                Register
              </button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <button
                type="button"
                onClick={toggleLoginPage}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Already have an account? Login here.
              </button>
            </>
          )}
        </form>
      </animated.div>
    </div>
  );
}

export default Signup;
