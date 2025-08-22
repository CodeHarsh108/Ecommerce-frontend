import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
export const store  = configureStore({
    reducer: {products: productReducer,},
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(store => next => action => {
            console.log('Dispatching:', action);
            return next(action);
        }),
    preloadedState: {
    }
});
export default store;