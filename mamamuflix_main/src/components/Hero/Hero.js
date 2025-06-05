import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const navigate = useNavigate();

  const handlebtn = () => {
    if(isLoggedIn)
      navigate('/home');

    else
      navigate('/login');
  }
  return (
    <section className="hero">
      <div className="container">
        <h1>আমাদের সিনেমার ঠেক</h1>
        <p>একবার দেখো, বারবার দেখো</p>
        <button className="btn" onClick={handlebtn}>Start Watching</button>
      </div>
    </section>
  );
}

export default Hero;