import React from 'react';
import './GridBox.css';

function GridBox({ imageUrl, altText, title }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={altText} />
      <h3>{title}</h3>
    </div>
  );
}

export default GridBox;