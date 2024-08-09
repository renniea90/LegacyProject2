
import { createContext, useState } from "react";
import itemsData from '../itemsData.json';

export const CartContext = createContext();

export function CartProvider({children}){

    const [itemsInCart, setItemsInCart] = useState([]);


    function addToCart(itemId){
        console.log("addToCart called with itemId:", itemId);

        const item = itemsData.find((item) => item.id === itemId)

        setItemsInCart((prev) => [...prev, item])

        

    }

    
    const contextValue = {
        itemsInCart,
        addToCart
    }

    console.log(itemsInCart)

    return(
        
            <CartContext.Provider value={contextValue}>     {children}     </CartContext.Provider>
        
    )

}