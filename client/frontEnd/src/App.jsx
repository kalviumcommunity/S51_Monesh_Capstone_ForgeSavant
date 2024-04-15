import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Build from "./Components/Build";
import './App.css'
import Signup from "./Components/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar/>
          <Home/>
        </>} />
        <Route path="/build" element={<Build/>}/>
      </Routes>
    </Router>
  );
};

export default App;
