import React from 'react';
import './Card.css';

const Card = ({ image, title, description, onClick }) => {
  return (
    <div className="attraction-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="card-button" onClick={onClick}>
          Saiba Mais
        </button>
      </div>
    </div>
  );
};

export default Card;