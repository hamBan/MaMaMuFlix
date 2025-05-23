import React from 'react';
import { Link } from 'react-router-dom';
import './SiteHeader.css';

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">মামামুFLIX</Link>
        <Link to="/home" className="nav-item" aria-current="page">Home</Link>
        <Link to="/movies" className="nav-item">Movies</Link>
        <Link to="/series" className="nav-item">Series</Link>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">My List</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;