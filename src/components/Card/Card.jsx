import './Card.css';

const Card = ({ image, title, categories, description, onClick }) => {

  //TODO: Provavelmente mudar para uma funcao JS unica no utils para uso no MODAL
  const getCategoryColor = (categories) => {
    switch (categories.type.toLowerCase()) {
      case "easy":
        return "#27ae60";
      case "medium":
        return "#f1c40f";
      case "hard":
        return "#e74c3c";
      default:
        return "#bbb"
    }
  }

  return (
    <div className="attraction-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <div className='category-list'>
          {Array.isArray(categories) ? categories.map((cat, i) => (
            <span
              className='category'
              style={{ backgroundColor: getCategoryColor(cat) }}
              key={i}
            >
              {cat.label}
            </span>
          )) : (
            <span className='category'>{categories}</span>
          )}
        </div>
        <p>{description}</p>
        <button onClick={onClick} className="btn">Saiba Mais</button>
      </div>
    </div>
  );
};

export default Card;
