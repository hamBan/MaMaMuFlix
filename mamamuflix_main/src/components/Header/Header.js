import React from 'react';
import { Link } from 'react-router-dom';
import './SiteHeader.css';
import Sidebar from './Sidebar'
import SearchBar from './SearchBar';

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container1">
        <div className='container_left'>
          <Link to="/" className="logo">মামামুFLIX</Link>
          <Link to="/home" className="nav-item" aria-current="page">Home</Link>
          <Link to="/movies" className="nav-item">Movies</Link>
          <Link to="/series" className="nav-item">Series</Link>
        </div>
        <div className='container_right'>
          <SearchBar className="search-icon1"/>
          <Sidebar />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;