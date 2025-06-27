import "./Dialog.css"

const AdminDialog = ({ isOpen, title, onClose, children, footer }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog">
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="dialog-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        {footer && <div className="dialog-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default AdminDialog;