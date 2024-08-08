import React from 'react';
import '../CSS/ConfirmationDialogue.css';

const ConfirmationDialogue = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialogue">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ConfirmationDialogue;
