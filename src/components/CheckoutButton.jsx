import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';

const CheckoutButton = ({ cartItems }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:8081/checkout', { cartItems });
            if (response.status === 200) {
                setAlertMessage('Checkout successful.');
            } else {
                setAlertMessage('Failed to complete checkout.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setAlertMessage('Failed to complete checkout.');
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default CheckoutButton;
