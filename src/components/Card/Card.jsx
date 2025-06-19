import './Card.css';

const Card = ({ image, title, description, link }) => {
  return (
    <div className="attraction-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className="card-button">Saiba Mais</a>
      </div>
    </div>
  );
};

export default Card;
