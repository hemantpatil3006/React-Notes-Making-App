import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
// Standard CSS used

const ConfirmationModal = ({ message, onClose, onConfirm }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles['modal-backdrop']} onClick={handleClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <p className={styles['modal-message']}>{message}</p>
        <div className={styles['modal-actions']}>
          <button className={`${styles['modal-btn']} ${styles['cancel-btn']}`} onClick={onClose}>Cancel</button>
          <button className={`${styles['modal-btn']} ${styles['delete-btn']}`} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
