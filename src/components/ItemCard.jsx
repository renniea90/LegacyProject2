import { useState, useCallback } from "react";
import CartButton from "./CartButton";
import CustomAlert from "./CustomAlert";

function ItemCard({ id, name, price, imageUrl, quantity }) {
  const [inputQuantity, setInputQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');

  const handleQuantityChange = useCallback((event) => {
    const value = event.target.value;
    const numberValue = parseInt(value, 10);

    if (value === '') {
      setInputQuantity('');
    } else if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= quantity) {
      setInputQuantity(numberValue);
      setAlertMessage('');
    } else if (numberValue > quantity) {
      setInputQuantity(quantity);
      setAlertMessage(`You can only select up to ${quantity} items.`);
    }
  }, [quantity]);

  return (
    <div className="card">
      <h2>{name}</h2>
      <h3>£{price?.toFixed(2)}</h3>
      <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
      <br />
      {quantity > 0 ? (
        <div className="quantityContainer">
          <label htmlFor={`quantity-${id}`} className="quantityLabel">Qty:</label>
          <input
            id={`quantity-${id}`}
            type="number"
            min="1"
            max={quantity}
            value={inputQuantity}
            onChange={handleQuantityChange}
            className="quantityInput"
          />
          <br />
          <CartButton />
        </div>
      ) : (
        <h3 className="outOfStock">Out of Stock</h3>
      )}
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage('')}     
        />
      )}
    </div>
  );
}

export default ItemCard;
