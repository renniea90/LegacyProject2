import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../CSS/Modal.css'; // Ensure correct path

const API_URL = 'http://localhost:8081/item/remove/';

const DeleteProduct = ({ productIdToDelete, onCancel, onConfirm }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        // Open the confirmation dialog when a productIdToDelete is provided
        if (productIdToDelete !== null) {
            setShowConfirmation(true);
        }
    }, [productIdToDelete]);

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`${API_URL}${productIdToDelete}`);
            if (response.status === 200) {
                console.log(`Product with ID ${productIdToDelete} successfully deleted.`);
                onConfirm(); // Notify parent to refetch items
            } else {
                console.error('Failed to delete the product with ID:', productIdToDelete);
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        } finally {
            setShowConfirmation(false);
        }
    };

    return (
        <>
            {showConfirmation && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => {
                        setShowConfirmation(false);
                        onCancel(); // Notify parent to cancel deletion
                    }}
                    contentLabel="Confirmation Dialog"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="button-group">
                        <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
                        <button className="cancel-btn" onClick={() => {
                            setShowConfirmation(false);
                            onCancel(); // Notify parent to cancel deletion
                        }}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default DeleteProduct;
