import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';

const RetrieveCart = ({ onRetrieve }) => {
    const [cartId, setCartId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleRetrieve = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/cart/${cartId}`);
            if (response.status === 200) {
                onRetrieve(response.data.cartItems);
                setAlertMessage('Cart successfully retrieved.');
            } else {
                setAlertMessage('Failed to retrieve cart.');
            }
        } catch (error) {
            console.error('Error retrieving cart:', error);
            setAlertMessage('Failed to retrieve cart.');
        }
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="retrieve-cart">
            <input
                type="text"
                placeholder="Enter Cart ID"
                value={cartId}
                onChange={(e) => setCartId(e.target.value)}
            />
            <button className="retrieve-cart-btn" onClick={handleRetrieve}>Retrieve Cart</button>
            {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
        </div>
    );
};

export default RetrieveCart;
