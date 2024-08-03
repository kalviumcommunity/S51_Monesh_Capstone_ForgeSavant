import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Corrected import
import logo from "../assets/ForgeSavant1.png";
import "../Styles/login.css";  // Updated CSS file
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any existing messages
    console.log(email, password);
    try {
      const response = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/login", {
        email,
        password
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("user", response.data)
        localStorage.setItem('email', email)
        navigate('/build'); // Navigate to /dashboard page after successful login
      } else {
        console.log("Error data: ", response.data); // Debugging log
        if (response.data.message === "Invalid credentials") {
          setMessage("Invalid credentials. Please try again.");
        } else {
          setMessage("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);

      // Check if the user already exists
      const existingUserResponse = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/checkGoogleUser", {
        email: decoded.email,
      });

      if (existingUserResponse.data.exists) {
        // User exists, log them in
        const loginResponse = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/googleLogin", {
          email: decoded.email,
          fullname: decoded.name
        });

        if (loginResponse.status === 200) {
          console.log("Login successful:", loginResponse.data);
          localStorage.setItem("user", JSON.stringify(loginResponse.data));
          localStorage.setItem('email', decoded.email);
          navigate('/build'); // Navigate to /build page after successful login
        }
      } else {
        // User does not exist, create a new account and log in
        const signupResponse = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/googleSignup", {
          fullname: decoded.name,
          email: decoded.email,
        });

        if (signupResponse.status === 201) {
          console.log("Sign-up successful:", signupResponse.data);
          localStorage.setItem("user", JSON.stringify(decoded.name));
          localStorage.setItem('email', decoded.email);
          navigate('/build'); // Navigate to /build page after successful sign-up
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="left-side-login">
        <img src={logo} alt="logo" className="logo-login" />
      </div>
      <div className="right-side-login">
        <div className="head-login">
          <h3>"Welcome Back!"</h3>
          <p className="login-text">
            "Login to continue"
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="form-login">
          <input
            type="text"
            name="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Link to="/signup">
          <button
            type="button"
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            Don't have an account? Sign up here.
          </button>
          </Link>
        </form>
        {message && <p className="error-message-login">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
