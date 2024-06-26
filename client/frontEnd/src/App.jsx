import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Build from "./Components/Build";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar/>
          <Home/>
        </>} />
        <Route path="/build" element={<>
          <Navbar/>
          <Build/>
        </>}/>
        <Route path="/loginAuthentication" element={<>
          <Login/>
        </>}/>
        <Route path="/SignupAuthentication" element={<>
          <Signup/>
        </>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
};

export default App;
