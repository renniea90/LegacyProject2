import React from 'react';
import axios from 'axios';

const CheckoutButton = ({ cartItems }) => {
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:8081/order/checkout', { items: cartItems });
            if (response.status === 200) {
                alert('Order successfully placed!');
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Error during checkout.');
        }
    };

    return (
        <button onClick={handleCheckout} className="checkout-btn">
            Checkout
        </button>
    );
};

export default CheckoutButton;
