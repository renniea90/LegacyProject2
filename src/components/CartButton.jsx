import { useState } from 'react';

const ChangeButton = () => {
    const [isInCart, setIsInCart] = useState(false);
  
    const handleClick = () => {
      setIsInCart(!isInCart);
    };
  
    return (
      <button
        className={isInCart ? "inCartButton" : "cartButton"}
        onClick={handleClick}
        aria-label={isInCart ? "Remove from cart" : "Add to cart"}
      >
        {isInCart ? "✅ Added to Cart" : "🛒 Add to Cart"}
      </button>
    );
  };
  
  export default ChangeButton;
