import React from 'react';
import axios from 'axios';

const SaveCartButton = ({ cartItems }) => {
    const handleSaveCart = async () => {
        try {
            const response = await axios.post('http://localhost:8081/cart/save', { items: cartItems });
            if (response.status === 200) {
                alert('Cart successfully saved!');
            } else {
                alert('Failed to save cart.');
            }
        } catch (error) {
            console.error('Error saving cart:', error);
            alert('Error saving cart.');
        }
    };

    return (
        <button onClick={handleSaveCart} className="save-cart-btn">
            Save Cart
        </button>
    );
};

export default SaveCartButton;
