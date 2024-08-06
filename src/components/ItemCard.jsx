import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

function ItemCard({ id, name, price, imageUrl, quantity }) {
  const { addToCart } = useContext(CartContext);
  const [buttonStatus, setButtonStatus] = useState("Not in Cart");

  function handleAddToCart() {
    addToCart(id);
    setButtonStatus("In Cart");
  }

  function handleRemoveFromCart() {
    setButtonStatus("Not in Cart");
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <h3>£{price?.toFixed(2)}</h3>
      <img className="card-image" src={imageUrl} alt={name} height={"150 px"} />
      <br/>
      {quantity > 0 ? (
        buttonStatus === "Not in Cart" ? (
          <button onClick={handleAddToCart} className="cartButton">
            🛒 Add to Cart
          </button>
        ) : (
          <button onClick={handleRemoveFromCart} className="inCartButton">
            ✅ Added to Cart
          </button>
        )
      ) : (
        <h3>Out of Stock</h3>
      )}
    </div>
  );
}

export default ItemCard;
