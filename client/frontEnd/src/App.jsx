import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Build from "./Components/Build";
import Signup from "./Components/Signup";
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
        <Route path="/authentication" element={<>
          <Signup/>
        </>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
};

export default App;
