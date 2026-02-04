import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './ConfirmModal.css';

const ConfirmModal = ({ 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  confirmType = 'primary',
  onConfirm, 
  onCancel 
}) => {
  return (
    <>
      <div className="modal-backdrop" onClick={onCancel}></div>
      <div className="modal confirm-modal">
        <div className="confirm-icon">
          <FiAlertTriangle />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`btn btn-${confirmType}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
