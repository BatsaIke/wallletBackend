// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ onClose, title, body }) => {
  return (
    <div className={`modal ${onClose ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <h2 className='modal-title'>{title}</h2>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
