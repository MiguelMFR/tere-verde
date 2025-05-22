import { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('');

  const nextSlide = () => {
    setTransitionDirection('next');
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setTransitionDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setTransitionDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Nossa Galeria</h2>
      
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
        
        <div className="carousel-slide">
          <div className={`slide-content ${transitionDirection}`}>
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="active-slide"
            />
            <div className="image-overlay">
              <p>{images[currentIndex].caption}</p>
            </div>
          </div>
        </div>
        
        <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
      </div>
      
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Gallery;