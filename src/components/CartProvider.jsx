
import { createContext, useState } from "react";
import itemsData from '../itemsData.json';

export const CartContext = createContext();

export function CartProvider({children}){

    const [itemsInCart, setItemsInCart] = useState([]);

    //search for item in the data file matching the ID's
    function addToCart(itemId){
        console.log("addToCart called with itemId:", itemId);

        const item = itemsData.find((item) => item.id === itemId)

        setItemsInCart((prev) => [...prev, item])

        

    }

    //what we are passing down
    const contextValue = {
        itemsInCart,
        addToCart
    }

    console.log(itemsInCart)

    return(
        
            <CartContext.Provider value={contextValue}>     {children}     </CartContext.Provider>
        
    )

}