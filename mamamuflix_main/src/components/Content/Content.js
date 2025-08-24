import React, { useEffect, useState } from 'react';
import './Content.css';
import axios from 'axios';
import GridBox from '../Grid/GridBox/GridBox';
import { useNavigate } from 'react-router-dom';


function Content() {

  const [allItems, setAllItems] = useState([]);
  const [error, setError] = useState(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getLoadingItems');
        setAllItems(response.data);
      }

      catch(err) {
        setError('Failed to load data');
      }
    }
    data();
  }, []);

  const latestItems = allItems.slice(0, 4);

  const handlePosterClick = (uid) => {
    if(isLoggedIn)
      navigate(`/watch/${uid}`);

    else
      navigate('/login');
  };

  return (
    <main className="content">
      <section className="featured">
        <h2>New Arrivals</h2>
        <div className="grid">
          {!error && latestItems.map(item => (
            <GridBox
              key={item.uid}
              imageUrl={item.poster}
              altText={item.title}
              title={item.title}
              onClick={() => handlePosterClick(item.uid)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Content;