// ItemCard.js
import React, { useState, useCallback } from 'react';
import CartButton from './CartButton';
import { useCart } from './CartContext';

const ItemCard = ({ id, name, price, imageUrl, quantity }) => {
    const [inputQuantity, setInputQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleQuantityChange = useCallback((event) => {
        setInputQuantity(parseInt(event.target.value, 10));
    }, []);

    const handleAddToCart = () => {
        addToCart({ id, name, price, imageUrl, quantity: inputQuantity });
    };

    return (
        <div className="card">
            <h2>{name}</h2>
            <h3>£{price?.toFixed(2)}</h3>
            <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
            <br />
            <p className="stock-info">Amount Available: {quantity}</p>
            {quantity > 0 ? (
                <div className="quantityContainer">
                    <label htmlFor={`quantity-${id}`} className="quantityLabel">Qty:</label>
                    <select
                        id={`quantity-${id}`}
                        value={inputQuantity}
                        onChange={handleQuantityChange}
                        className="quantityDropdown"
                    >
                        {Array.from({ length: quantity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <br />
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            ) : (
                <h3 className="outOfStock">Out of Stock</h3>
            )}
        </div>
    );
};

export default ItemCard;
