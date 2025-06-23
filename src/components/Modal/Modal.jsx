import { useState } from 'react';
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
            <img
              src={type.imagem}
              alt={type.nome}
              onClick={() => setZoomed(true)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="modal-text-content">
            <h2>{type.nome}</h2>
            <div className='children'>
              {children}
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
