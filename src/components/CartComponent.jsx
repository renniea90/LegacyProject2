import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext'; // Import the correct useCart from CartContext.jsx
import axios from 'axios'; // Ensure axios is imported
import CustomAlert from './CustomAlert'; // Ensure CustomAlert is imported
import '../CSS/CartComponent.css';


const CartItemRow = ({ item, itemMap, handleQuantityChange, handleRemoveItem }) => (
  <tr>
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
);

const CartSummary = ({ total, serviceCharge }) => (
  <>
    <tr>
      <td colSpan="3">Subtotal</td>
      <td>£{total}</td>
      <td></td>
    </tr>
    <tr>
      <td colSpan="3">Service Charge (7.25%)</td>
      <td>£{serviceCharge}</td>
      <td></td>
    </tr>
    <tr>
      <td colSpan="3">Total</td>
      <td>£{(total + parseFloat(serviceCharge)).toFixed(2)}</td>
      <td></td>
    </tr>
  </>
);

const SaveCartButton = () => {
  const { cartItems, setNewCart, clearCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSaveCart = async () => {
    try {
      const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        const orderId = response.data;
        setAlertMessage(`Cart successfully saved. Your order ID is ${orderId}.`);
        setNewCart(orderId);
      } else {
        setAlertMessage('Failed to save cart.');
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      setAlertMessage('Failed to save cart.');
    }
    setShowAlert(true);
    clearCart();
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

const CheckoutButton = () => {
  const { cartItems, newCart, setNewCart, clearCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCheckout = async () => {
    let checkoutId = newCart;

    try {
      if (checkoutId === null) {
        const response = await axios.post('http://localhost:8083/cart/add', cartItems, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
          checkoutId = response.data;
          setNewCart(checkoutId);
        } else {
          return;
        }
      }

      const itemDataList = await fetchAllItems(cartItems.map(item => item.id));

      let allItemsAvailable = true;
      let insufficientItems = [];

      for (let item of cartItems) {
        const itemStockLevel = itemDataList.find(data => data.id === item.id);
        if (itemStockLevel && itemStockLevel.quantity < item.quantity) {
          allItemsAvailable = false;
          insufficientItems.push(item.name);
        }
      }

      if (allItemsAvailable) {
        await batchUpdateItemsAndCart(itemDataList, checkoutId, cartItems);
        setAlertMessage('Checkout complete!');
        clearCart();
      } else {
        setAlertMessage(`The following items have insufficient quantities: ${insufficientItems.join(", ")}`);
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Error during checkout:", error);
      setAlertMessage("An error occurred during checkout. Please try again.");
      setShowAlert(true);
    }
  };

  const fetchAllItems = async (itemIds) => {
    try {
      const response = await axios.post('http://localhost:8082/items/getByIds', itemIds);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch items:', error);
      return [];
    }
  };

  const batchUpdateItemsAndCart = async (itemDataList, checkoutId, cartItems) => {
    try {
      for (let item of cartItems) {
        const itemStockLevel = itemDataList.find(data => data.id === item.id);
        if (itemStockLevel) {
          const newStockLevel = itemStockLevel.quantity - item.quantity;
          await axios.patch(`http://localhost:8082/item/update/${item.id}`, { quantity: newStockLevel });
        }
      }
    } catch (error) {
      console.error('Failed to update items in the cart:', error);
      throw error;
    }

    try {
      const response = await axios.patch(`http://localhost:8083/cart/update/${checkoutId}`, {
        status: "Completed",
      });
      if (response.status === 200) {
        console.log('Order status updated');
      } else {
        console.log("Something went wrong updating order status");
      }
    } catch (error) {
      console.error('Error during order status update:', error);
      setAlertMessage('Failed to complete checkout.');
      setShowAlert(true);
    }
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

const RetrieveCart = () => {
  const { setCartItems, setNewCart } = useCart();
  const [cartId, setCartId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleRetrieve = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/cart/${cartId}`);
      if (response.status === 200) {
        setNewCart(cartId);
        setCartItems(response.data);
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

const CartActions = ({ onRetrieve }) => {
  return (
    <>
      <div className="button-container">
        <SaveCartButton className="save-cart-btn" />
        <CheckoutButton className="checkout-btn" />
      </div>
      <div className="retrieve-cart">
        <RetrieveCart onRetrieve={onRetrieve} />
      </div>
    </>
  );
};

const CartTable = ({ itemMap, handleQuantityChange, handleRemoveItem, total, serviceCharge, onRetrieve }) => {
  const { cartItems } = useCart();

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
        {cartItems.map((item) => (
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
          <td colSpan="5">
            <CartActions onRetrieve={onRetrieve} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const CartComponent = ({ items }) => {
  const { cartItems, updateQuantity, removeFromCart, setCartItems } = useCart();
  const [itemMap, setItemMap] = useState({});

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
    return (total * 0.0725).toFixed(2);
  };

  const total = parseFloat(calculateTotal());
  const serviceCharge = calculateServiceCharge(total);

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      <CartTable
        itemMap={itemMap}
        handleQuantityChange={handleQuantityChange}
        handleRemoveItem={handleRemoveItem}
        total={total}
        serviceCharge={serviceCharge}
      />
    </div>
  );
};

export default CartComponent;
