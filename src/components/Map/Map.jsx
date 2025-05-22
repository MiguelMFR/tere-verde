import React from 'react';
import './Map.css';

const Map = ({ location }) => {
  // Se location não for fornecido, mostra o mapa padrão de Teresópolis
  const defaultCoords = { latitude: -22.4483875, longitude: -42.9832701 };
  const coords = location?.coordenadas || defaultCoords; // singular e correto!

  return (
    <div className="map-container">
      <h2>Explore Nossas Atrações</h2>
      <div className="map-placeholder">
        <iframe
          title={`Mapa de ${location?.nome || 'Teresópolis'}`}
          src={`https://www.google.com/maps?q=${coords?.latitude},${coords?.longitude}&z=14&output=embed`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        
        <div className="map-legend">
          <div className="legend-item">
            <span className="icon trail"></span>
            <span>Trilhas</span>
          </div>
          <div className="legend-item">
            <span className="icon waterfall"></span>
            <span>Cachoeiras</span>
          </div>
          <div className="legend-item">
            <span className="icon park"></span>
            <span>Parques</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;