import React from 'react';
import './SiteHeader.css';

function SiteHeader() {
  const handleLogoClick = (event) => {
    event.preventDefault();
    console.log("Logo clicked!");
  };
  return (
    <header className="site-header">
      <div className="container">
        <a href="#" className="logo" onClick={handleLogoClick}>মামামুFLIX</a>
        <a className="nav-item" aria-current="page" href="#">Home</a>
        <a className="nav-item" href="#">Movies</a>
        <a className="nav-item" href="#">Shows</a>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="#" onClick={handleLogoClick}>My List</a></li>
            <li><a href="#" onClick={handleLogoClick}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;