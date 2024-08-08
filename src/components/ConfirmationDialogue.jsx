import React from 'react';
import Modal from 'react-modal';
import '../CSS/Modal.css'; 

const ConfirmationDialogue = ({ message, onConfirm, onCancel }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onCancel}
            contentLabel="Confirmation Dialog"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Confirmation</h2>
            <p>{message}</p>
            <div className="button-group">
                <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ConfirmationDialogue;
