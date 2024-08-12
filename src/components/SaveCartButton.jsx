import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';

const SaveCartButton = ({ cartItems }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSaveCart = async () => {
        try {
            const response = await axios.post('http://localhost:8082/cart/save', { cartItems });
            if (response.status === 200) {
                setAlertMessage('Cart successfully saved.');
            } else {
                setAlertMessage('Failed to save cart.');
            }
        } catch (error) {
            console.error('Error saving cart:', error);
            setAlertMessage('Failed to save cart.');
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="save-cart-btn" onClick={handleSaveCart}>Save Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default SaveCartButton;
