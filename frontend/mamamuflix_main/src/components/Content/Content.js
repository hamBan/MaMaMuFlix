import React from 'react';
import './Content.css';
import FeaturedCard from './FeaturedCard/FeaturedCard';
import Poster1 from '../../assets/parasite.jpg';
import Poster2 from '../../assets/pather_panchali.jpg';
import Poster3 from '../../assets/the_shawshank_redemption.png';



function Content() {
  return (
    <main className="content">
      <section className="featured">
        <h2>New Arrivals</h2>
        <div className="grid">
          <FeaturedCard imageUrl={Poster1} altText="Parasite" title="Parasite" />
          <FeaturedCard imageUrl={Poster2} altText="Pather Panchali" title="Pather Panchali" />
          <FeaturedCard imageUrl={Poster3} altText="The Shawshank Redemption" title="The Shawshank Redemption" />
        </div>
      </section>
    </main>
  );
}

export default Content;