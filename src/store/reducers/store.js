import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const user = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null ;



const initialState = {
    auth: { user: user,},
    carts: {
        cart: cartItems,
        totalPrice: 0,
        cartId: null,
    },
    errors: { 
        isLoading: false,
        errorMessage: null,
        categoryLoader: false,
        categoryError: null,
        btnLoader: false,
    }
};
    

export const store  = configureStore({
    reducer: {
        products: productReducer,
        carts: cartReducer,
        auth: authReducer,
        errors: errorReducer,
    },
    preloadedState: initialState,
});
export default store;