import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";
import CustomAlert from "./CustomAlert";

function ItemCard({ id, name, price, imageUrl, quantity }) {
  const { addToCart } = useContext(CartContext);
  const [buttonStatus, setButtonStatus] = useState("Not in Cart");
  const [inputQuantity, setInputQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  function handleAddToCart() {
    if (inputQuantity > 0 && inputQuantity <= quantity) {
      addToCart(id, inputQuantity);
      setButtonStatus("In Cart");
    } else {
      setAlertMessage("Please enter a valid quantity.");
      setShowAlert(true);
    }
  }

  function handleRemoveFromCart() {
    setButtonStatus("Not in Cart");
  }

  function handleQuantityChange(event) {
    const value = event.target.value;
    const numberValue = parseInt(value, 10);

    if (value === '') {
      setInputQuantity('');
    } else if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= quantity) {
      setInputQuantity(numberValue);
      setShowAlert(false); 
    } else if (numberValue > quantity) {
      setInputQuantity(quantity);
      setAlertMessage(`You can only select up to ${quantity} items.`);
      setShowAlert(true);
    }
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <h3>£{price?.toFixed(2)}</h3>
      <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
      <br />
      {quantity > 0 ? (
        <div className="quantityContainer">
          <span className="quantityLabel">Qty:</span>
          <input
            type="number"
            min="1"
            max={quantity}
            value={inputQuantity}
            onChange={handleQuantityChange}
            className="quantityInput"
          />
          <br />
          {buttonStatus === "Not in Cart" ? (
            <button onClick={handleAddToCart} className="cartButton">
              🛒 Add to Cart
            </button>
          ) : (
            <button onClick={handleRemoveFromCart} className="inCartButton">
              ✅ Added to Cart
            </button>
          )}
        </div>
      ) : (
        <h3 className="outOfStock">Out of Stock</h3>
      )}
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default ItemCard;
