import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

function ItemCard({ id, name, price, imageUrl, quantity }) {
  const { addToCart } = useContext(CartContext);
  const [buttonStatus, setButtonStatus] = useState("Not in Cart");
  const [inputQuantity, setInputQuantity] = useState(1); 

  function handleAddToCart() {
    if (inputQuantity > 0 && inputQuantity <= quantity) {
      addToCart(id, inputQuantity); 
      setButtonStatus("In Cart");
    } else {
      alert("Please enter a valid quantity");
    }
  }

  function handleRemoveFromCart() {
    setButtonStatus("Not in Cart");
  }

  function handleQuantityChange(event) {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= quantity) {
      setInputQuantity(value);
    } else {
      setInputQuantity(1); // Reset to 1 if the value is invalid
    }
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <h3>£{price?.toFixed(2)}</h3>
      <img className="card-image" src={imageUrl} alt={name} height={"50px"} />
      <br/>
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
    </div>
  );
}

export default ItemCard;

