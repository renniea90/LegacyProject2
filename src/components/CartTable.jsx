import React from 'react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import CartActions from './CartActions';
import '../CSS/CartTable.css';

const CartTable = ({ cartItems, itemMap, retrievedCart, handleQuantityChange, handleRemoveItem, total, serviceCharge, onRetrieve }) => {
    return (
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
                {(retrievedCart.length > 0 ? retrievedCart : cartItems).map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        itemMap={itemMap}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </tbody>
            <tfoot>
                <CartSummary total={total} serviceCharge={serviceCharge} />
                <tr>
                    <td colSpan="5" className="button-row">
                        <CartActions onRetrieve={onRetrieve} />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default CartTable;
