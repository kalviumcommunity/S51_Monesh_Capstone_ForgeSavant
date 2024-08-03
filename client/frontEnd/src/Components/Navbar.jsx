import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import Forge from '../assets/ForgeSavant2.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBuildPage = location.pathname === '/build';
  const user = localStorage.getItem('user');

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      window.location.hash = 'about';
    } else {
      navigate('/#about');
    }
  };

  return (
    <>
      <div className="Navbar">
        <div className="left-Nav">
          <Link to="/">
            <img src={Forge} alt="Forge" id='brandLogo' />
          </Link>
        </div>
        <div className="right-Nav">
          <button id='btn' onClick={handleAboutClick}>About</button>
          {!isBuildPage && user ? (
            <Link to="/build" aria-label='Forge Your PC'>
              <button className="Build">Forge Your PC</button>
            </Link>
          ) : null}
          {user ? (
            <Link to="/profile" aria-label='profile'>
              <button className="Build">Profile</button>
            </Link>
          ) : (
            <Link to="/loginAuthentication" aria-label='authentication'>
              <button className="Build">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
