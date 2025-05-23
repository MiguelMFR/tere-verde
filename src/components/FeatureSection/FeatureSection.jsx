import './FeatureSection.css';

const FeatureSection = ({ title, description, image, reverse }) => {
  return (
    <section className={`feature-section ${reverse ? 'reverse' : ''}`}>
      <div className="feature-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="feature-button">Saiba Mais</button>
      </div>
      <div className="feature-image">
        <img src={image} alt={title} />
      </div>
    </section>
  );
};

export default FeatureSection;