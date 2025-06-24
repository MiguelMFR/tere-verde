import Gallery from '../Gallery/Gallery';
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
                    <h2 style={{textAlign: 'center'}}>{type.nome}</h2>
                    {/* <img
                        src={type.imagem}
                        alt={type.nome}
                        style={{ width: '480px', height: '480px',  borderRadius: '8px', marginBottom: '10px' }}
                    /> */}
                    <Gallery images={["https://www.viviantelles.com.br/wp-content/uploads/2019/05/Travessia-Petropolis-Teres%C3%B3polis-8.jpg", "https://www.viviantelles.com.br/wp-content/uploads/2019/05/Travessia-Petropolis-Teres%C3%B3polis-8.jpg"]}/>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;