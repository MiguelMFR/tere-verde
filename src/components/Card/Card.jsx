import './Card.css';

const Card = ({ image, title, description, onClick, link }) => {
  return (
    <div className="attraction-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a onClick={onClick} href={link} className="btn">Saiba Mais</a>
      </div>
    </div>
  );
};

export default Card;
