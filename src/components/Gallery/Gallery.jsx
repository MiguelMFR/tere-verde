import { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('');
  const [zoomed, setZoomed] = useState(false);

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
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>

        <div className="carousel-slide">
          <div className={`slide-content ${transitionDirection}`}>
            <img
              src={images[currentIndex]}
              alt={images[currentIndex].alt}
              className="active-slide"
              onClick={() => setZoomed(true)}
              style={{ cursor: "zoom-in" }}
            />
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

      {zoomed && (
        <div className="gallery-zoom-overlay" onClick={() => setZoomed(false)}>
          <img
            src={images[currentIndex]}
            alt={images[currentIndex].alt}
            className="gallery-zoom-img"
            onClick={e => e.stopPropagation()}
          />
          <button className='gallery-zoom-close' onClick={() => setZoomed(false)}>&times;</button>
        </div>
      )}

    </div>
  );
};

export default Gallery;
