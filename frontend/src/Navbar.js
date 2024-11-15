import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-hamburger">
        <button className="hamburger-button">☰</button>
      </div>
      <div className="navbar-title">Fall 2025 Plans</div>
      <div className="navbar-profile">
        <span>Marko Gjurevski</span>
        <div className="profile-photo"></div>
      </div>
    </nav>
  );
}

export default Navbar;
