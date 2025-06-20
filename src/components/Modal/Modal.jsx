import './Modal.css'

const Modal = ({ isOpen, onClose, type, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div>
                    <h2>{type.nome}</h2>
                    <img
                        src={type.imagem}
                        alt={type.nome}
                        style={{ width: '480px', height: '480px',  borderRadius: '8px', marginBottom: '10px' }}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;