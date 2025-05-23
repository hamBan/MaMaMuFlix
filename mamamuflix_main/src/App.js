import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Content />
      <Footer />
    </div>
  );
}

export default App;