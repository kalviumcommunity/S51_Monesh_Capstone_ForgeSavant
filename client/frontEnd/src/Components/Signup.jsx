import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Corrected import
import logo from "../assets/ForgeSavant1.png";
import "../Styles/signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any existing messages

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        fullname,
        email,
        password
      });

      if (response.status === 201) {
        console.log("Sign-up successful:", response.data);
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
          />
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
          <button type="submit" className="register">
            Register
          </button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);  // Using jwt_decode
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
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
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
