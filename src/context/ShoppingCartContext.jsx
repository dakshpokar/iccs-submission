import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext()

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useState([]) 
    const [isCartOpen, setCartOpen] = useState(false)

    const openCart = () => setCartOpen(true)
    const closeCart = () => setCartOpen(false)

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)

    function getItemQuantity(productId){
        return cartItems.find(item => item.id === productId)?.quantity || 0;
    };

    function increaseCartQuantity(product){
        setCartItems((currentCartItems) => {
            if(currentCartItems.find(item => item.id == product.id) == null){
                return [...currentCartItems, {...product, quantity: 1}]
            }else{
                return currentCartItems.map(item => {
                    if(item.id === product.id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    };

    function decreaseCartQuantity(product){
        setCartItems((currentCartItems) => {
            if(currentCartItems.find(item => item.id == product.id)?.quantity == 1){
                return currentCartItems.filter(item => item.id !== product.id)
            }else{
                return currentCartItems.map(item => {
                    if(item.id === product.id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    };

    function removeFromCart(product){
        setCartItems((currentCartItems) => {
            return currentCartItems.filter(item => item.id !== product.id)
        })
    };

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart
            }}>
            {children}
            <ShoppingCart isCartOpen={isCartOpen}/>
        </ShoppingCartContext.Provider>
    )
}