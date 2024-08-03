import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Corrected import
import logo from "../assets/ForgeSavant1.png";
import "../Styles/signup.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any existing messages
    if (!validateForm()) {
      return;
    }
    console.log(fullname, email, password);
    try {
      const response = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/signup", {
        fullname,
        email,
        password
      });

      if (response.status === 201) {
        console.log("Sign-up successful:", response.data);
        localStorage.setItem("user", JSON.stringify(fullname));
        localStorage.setItem('email', email);
        navigate('/build'); // Navigate to /build page after successful sign-up
      } else {
        console.log("Error data: ", response.data); // Debugging log
        if (response.data.message === "User already exists") {
          setMessage("User already exists. Please login.");
        } else {
          setMessage("Sign-up failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
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
          googleLogin: true,
        });

        if (loginResponse.status === 200) {
          console.log("Login successful:", loginResponse.data);
          localStorage.setItem("user", JSON.stringify(loginResponse.data));
          localStorage.setItem('email', decoded.email);
          navigate('/build'); // Navigate to /build page after successful login
        }
      } else {
        // User does not exist, create a new account
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
      console.error("Error during Google sign-up/login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Signup">
      <div className="left-side">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="right-side">
        <div className="head">
          <h3>"Hello!"</h3>
          <p className="signup-text">
            "Sign up to get started"
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className="form">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            aria-label="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="register">
            Register
          </button>
          <GoogleLogin
            onSuccess={handleGoogleSignUp}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Link to="/loginAuthentication">
            <button
              type="button"
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Already have an account? Login here.
            </button>
          </Link>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
