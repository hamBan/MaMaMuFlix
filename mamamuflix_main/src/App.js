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
import Search from './components/Header/Search';
import VideoPlayerPage from './components/VideoPlayerPage/VideoPlayerPage';


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
            <Route path="/Search" element={<Search />} />
            <Route path="/watch/:uid" element={<VideoPlayerPage/>} />
          </Routes>
        <Footer />
      </div>
  );
}

export default App;