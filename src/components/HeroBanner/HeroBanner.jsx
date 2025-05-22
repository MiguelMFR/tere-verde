import React from 'react';
import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="hero-banner" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className="cta-button">Explore Agora</button>
      </div>
    </div>
  );
};

export default HeroBanner;