import React from 'react';
import { Link } from 'react-router-dom';
import './SiteHeader.css';
import Sidebar from './Sidebar'
import SearchBar from './SearchBar';

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">মামামুFLIX</Link>
        <Link to="/home" className="nav-item" aria-current="page">Home</Link>
        <Link to="/movies" className="nav-item">Movies</Link>
        <Link to="/series" className="nav-item">Series</Link>
        <SearchBar />
        <Sidebar />
      </div>
    </header>
  );
}

export default SiteHeader;