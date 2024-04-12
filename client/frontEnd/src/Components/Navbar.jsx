import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import brandLogo from '../assets/ForgeSavant2.png';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <img src={brandLogo} alt="Forge Savant Logo" />
        <Link to="/build"><button id='build'>Forge your PC</button></Link>
      </div>
    </>
  );
}

export default Navbar;
