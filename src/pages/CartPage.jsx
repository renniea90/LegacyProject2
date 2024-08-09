import '../CSS/CartPage.css';
import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import useFetchItems from '../components/FetchItems';
import SaveCartButton from '../components/SaveCartButton';
import CheckoutButton from '../components/CheckoutButton';
import RetrieveCart from '../components/RetrieveCart'; 

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const { items } = useFetchItems();
    const [itemMap, setItemMap] = useState({});
    const [retrievedCart, setRetrievedCart] = useState([]);

    useEffect(() => {
        const map = items.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setItemMap(map);
    }, [items]);

    const handleQuantityChange = (id, event) => {
        const quantity = parseInt(event.target.value, 10);
        updateQuantity(id, quantity);
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateServiceCharge = (total) => {
        return (total * 0.075).toFixed(2);
    };

    const total = parseFloat(calculateTotal());
    const serviceCharge = calculateServiceCharge(total);

    const handleRetrieveCart = (cartItems) => {
        setRetrievedCart(cartItems);
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {retrievedCart.length > 0 ? (
                        retrievedCart.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>£{item.price.toFixed(2)}</td>
                                <td>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e)}
                                    >
                                        {Array.from({ length: itemMap[item.id] || 0 }, (_, i) => i + 1).map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>£{(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>£{item.price.toFixed(2)}</td>
                                <td>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e)}
                                    >
                                        {Array.from({ length: itemMap[item.id] || 0 }, (_, i) => i + 1).map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>£{(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Subtotal</td>
                        <td>£{total}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="3">Service Charge (7.5%)</td>
                        <td>£{serviceCharge}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="3">Total</td>
                        <td>£{(total + parseFloat(serviceCharge)).toFixed(2)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="button-row">
                            <div>
                            <SaveCartButton cartItems={cartItems} />
                            <CheckoutButton cartItems={cartItems} />
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <RetrieveCart onRetrieve={handleRetrieveCart} /> {/* Add RetrieveCart component */}
        </div>
    );
};

export default CartPage;
