import { useState } from 'react';
import Gallery from '../Gallery/Gallery';
import './Modal.css'

const Modal = ({ isOpen, onClose, type, children }) => {
  const [zoomed, setZoomed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className='modal-body'>
          <div className='modal-img'>
            <Gallery
              images={type.imagem}
            />
            {/* <img
              src={type.imagem}
              alt={type.nome}
              onClick={() => setZoomed(true)}
              style={{ cursor: "zoom-in" }}
            /> */}
          </div>
          <div className="modal-text-content">
            <h2>{type.nome}</h2>
            <h4>{type.descricao}</h4>
            <div className='children'>
              {children.map((chave, val) => {
                const [key, ...value] = chave.split(":");
                return (
                  <div className='modal-info-row' key={val}>
                    <span className="modal-info-key">{key}:</span>
                    <span className="modal-info-value">{value.join(":").trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {zoomed && (
        <div className="modal-zoom-overlay" onClick={() => setZoomed(false)}>
          <img
            src={type.imagem}
            alt={type.nome}
            className="modal-zoom-img"
            onClick={e => e.stopPropagation()}
          />
          <button className='modal-zoom-close' onClick={() => setZoomed(false)}>&times;</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
