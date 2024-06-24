import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';
import Forge from '../assets/ForgeSavant2.png';

const Navbar = () => {

  const location = useLocation()
  const isBuildPage = location.pathname === '/build'

  return (
    <>
      <div className="Navbar">
        <div className="left-Nav">
          <img src={Forge} alt="Forge" id='brandLogo'/>
        </div>
        <div className="right-Nav">
          <button id='btn'>FAQ</button>
          <button id='btn'>About</button>
          {!isBuildPage ? (
            <Link to="/build" aria-label='Forge Your PC'>
              <button className="Build">Forge Your PC</button>
            </Link>
          ) : (
            <Link to="/authentication" aria-label='authentication'>
              <button className="Build">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
