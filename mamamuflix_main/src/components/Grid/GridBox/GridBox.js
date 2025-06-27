import React from 'react';
import './GridBox.css';

function GridBox({ imageUrl, altText, title, onClick }) {
  return (
    <div className="card" onClick={onClick} >
      <img src={imageUrl} alt={altText} />
      <h3>{title}</h3>
    </div>
  );
}

export default GridBox;