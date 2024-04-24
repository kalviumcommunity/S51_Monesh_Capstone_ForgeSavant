import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import Forge from '../assets/ForgeSavant2.png';

const Navbar = () => {
  return (
    <>
      <div className="Navbar">
        <div className="left-Nav">
          <img src={Forge} alt="Forge" id='brandLogo'/>
        </div>
        <div className="right-Nav">
          <p id='FAQ'>FAQ</p>
          <p id='About'>About</p>
          <Link to="/build" aria-label='Forge Your PC'>
            <button className="Build">Forge Your PC</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
