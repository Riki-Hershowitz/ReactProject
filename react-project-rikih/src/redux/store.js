import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/usersSlice';
import productsReducer from './slices/productsSlice';
import glassesReducer from './slices/glassesSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer, 
        Users: usersReducer,
        glasses: glassesReducer,
    },
});

export default store;