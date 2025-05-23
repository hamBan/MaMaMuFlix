import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>আমাদের সিনেমার ঠেক</h1>
        <p>একবার দেখো, বারবার দেখো</p>
        <Link to="/movies" className="btn">Start Watching</Link>
      </div>
    </section>
  );
}

export default Hero;