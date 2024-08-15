import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import { useCart } from './CartContext'; 

const CheckoutButton = () => {
    const { cartItems } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const cartId = cartItems.length > 0 ? cartItems[0].cartId : null; 

    const handleCheckout = async () => {
        if (!cartId) {
            setAlertMessage('No cart ID available.');
            setShowAlert(true);
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:8083/cart/checkout/${cartId}`);
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
