import './HeroBanner.css';

const HeroBanner = ({ title, subtitle, backgroundImage, targetId }) => {

  const handleClick = () => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button className="btn" onClick={handleClick}>Explore Agora</button>
      </div>
    </div>
  );
};

export default HeroBanner;
