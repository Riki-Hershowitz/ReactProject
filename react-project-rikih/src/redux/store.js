import { configureStore } from '@reduxjs/toolkit';
import  cartReducer from './slices/cartSlice';
import ProductsReducer from './slices/ProductsSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        Products: ProductsReducer, 
    },
});

export default store;