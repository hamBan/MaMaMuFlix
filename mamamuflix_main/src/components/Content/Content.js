import React from 'react';
import './Content.css';
import FeaturedCard from './FeaturedCard/FeaturedCard';
import allItems from '../../data/all.json';


function Content() {
  const latestItems = allItems.slice(0, 4); // Connection to API endpoint needed
  return (
    <main className="content">
      <section className="featured">
        <h2>New Arrivals</h2>
        <div className="grid">
          {latestItems.map(item => (
            <FeaturedCard
              imageUrl={item.imageUrl}
              altText={item.altText}
              title={item.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Content;