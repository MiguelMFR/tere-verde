import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, backgroundImage, onClick }) => {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className="btn" onClick={onClick}>Explore Agora</button>
      </div>
    </div>
  );
};

export default HeroBanner;
