import { useContext, useState } from "react";
import ChangeButton from "../components/CartButton";
import { CartContext } from "./CartProvider";

function PlantCard({id, name, price, imageUrl}) {

  const {addToCart} = useContext(CartContext)
  const [buttonStatus, setButtonStatus] = useState("Not in Cart");


  function handleAddToCart(){
    addToCart(id)

    setButtonStatus("In Cart");
  }

  function handleRemoveFromCart() {
    setButtonStatus("Not in Cart");
  }


  return (
    <div className="card">
        <h2>{name}</h2>
        <h3>£{price?.toFixed(2)}</h3>
        <img className="card-image" src={imageUrl} alt="broken image" height={"150 px"} />
        <br/>
        {/* <ChangeButton /> */}
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
      
  );
};

export default PlantCard;

// {itemsData.map((item) => (
//     <div key={item.id}>
//       <h1>{item.name}</h1>
//       <h3>£{item.price.toFixed(2)}</h3>
//       <img className="card-image" src={item.imageUrl} />
//     </div>
//   ))}