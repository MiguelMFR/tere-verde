import { getCategoryColor } from '../../utils/functions/getCategoryColor';
import './Card.css';

const Card = ({ image, title, page, categories, description, onClick, item, onEdit, onDelete }) => {

  return (
    <div className="card-container">
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
        {onClick && (
          <button onClick={onClick} className="btn" aria-label='saiba mais'>Saiba Mais</button>
        )}
        {onEdit && onDelete && (
          <div className='adm-btn'>
            <button className='btn btn-edit' onClick={() => onEdit(item)} aria-label="editar">Editar</button>
            <button className='btn btn-delete' onClick={() => onDelete(item)} aria-label="deletar">Deletar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
