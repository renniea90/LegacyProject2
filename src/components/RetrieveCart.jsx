import React, { useState } from 'react';
import axios from 'axios';

const RetrieveCart = ({ onRetrieve }) => {
    const [cartId, setCartId] = useState('');

    const handleRetrieve = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/cart/${cartId}`);
            if (response.status === 200) {
                onRetrieve(response.data.cartItems);
            } else {
                alert('Failed to retrieve cart. Please try again.');
            }
        } catch (error) {
            console.error('Error retrieving cart:', error);
            alert('Failed to retrieve cart. Please try again.');
        }
    };

    return (
        <div className="retrieve-cart">
            <input
                type="text"
                placeholder="Enter Cart ID"
                value={cartId}
                onChange={(e) => setCartId(e.target.value)}
            />
            <button onClick={handleRetrieve}>Retrieve Cart</button>
        </div>
    );
};

export default RetrieveCart;
