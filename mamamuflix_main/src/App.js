import React, {useEffect} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import Series from './components/Series/Series';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


function App() {

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }, []);

  return (
      <div>
        <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/video" element={<Video videoId="5xH0HfJHsaY" thumbnail="https://miro.medium.com/v2/resize:fit:1400/1*Z6Z8F2dezcemfJ3XFOAB4w.jpeg" />} /> */}
            {/* <Route path="/video" element={<div className="theater-wrapper">
              <VideoPlayer videoId="5xH0HfJHsaY" thumbnail="https://miro.medium.com/v2/resize:fit:1400/1*Z6Z8F2dezcemfJ3XFOAB4w.jpeg"/>
              </div>}
            /> */}
          </Routes>
        <Footer />
      </div>
  );
}

export default App;