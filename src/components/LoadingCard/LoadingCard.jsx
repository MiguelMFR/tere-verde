import './LoadingCard.css';

const LoadingCard = () => {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-card__image pulse"></div>
        <div className="loading-card__content">
          <div className="loading-card__title pulse"></div>
          <div className="loading-card__description pulse"></div>
          <div className="loading-card__categories">
            <div className="loading-card__category pulse"></div>
            <div className="loading-card__category pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
