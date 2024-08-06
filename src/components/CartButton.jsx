import { useState } from 'react';
 
const ChangeButton = () => {
 
    const [buttonStatus, setButtonStatus] = useState("Not in Cart");
 
    if(buttonStatus=="Not in Cart"){
    
        return (
            <>
                <button className="cartButton" onClick={() => (setButtonStatus("InCart"))}>
                    🛒 Add to Cart
                </button>
            </>
        );
    } else{
        return (
            <>
                <button className="inCartButton" onClick={() => (setButtonStatus("Not in Cart"))}>
                ✅ Added to Cart 
                </button>
            </>
        );

    }
}
 
export default ChangeButton;