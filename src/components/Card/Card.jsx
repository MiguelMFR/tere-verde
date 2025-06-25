import { getCategoryColor } from '../../utils/functions/getCategoryColor';
import './Card.css';

const Card = ({ image, title, page, categories, description, onClick }) => {

  return (
    <div className="attraction-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        {categories && (
          <div className='category-list'>
            {Array.isArray(categories) ? categories.map((cat, i) => (
              <span
                className='category'
                style={{ backgroundColor: getCategoryColor(page, cat) }}
                key={i}
              >
                {cat.label}
              </span>
            )) : (
              <span className='category'>{categories}</span>
            )}
          </div>
        )}
        <p>{description}</p>
        <button onClick={onClick} className="btn">Saiba Mais</button>
      </div>
    </div>
  );
};

export default Card;
