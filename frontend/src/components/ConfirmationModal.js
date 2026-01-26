import React from "react";
import ReactDOM from "react-dom";
// Standard CSS used

const ConfirmationModal = ({ message, onClose, onConfirm }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-btn delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
