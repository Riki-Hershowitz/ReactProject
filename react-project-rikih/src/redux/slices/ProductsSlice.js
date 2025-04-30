import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array to hold products items
    totalProducts: 0, // Total number of items in the products
};

const ProductsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice += newItem.price * newItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    totalPrice: newItem.price * newItem.quantity,
                });
            }
            state.totalProducts += newItem.quantity;
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalProducts -= existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        updateItem(state, action) {
            const updatedItem = action.payload;
            const existingItem = state.items.find(item => item.id === updatedItem.id);
            if (existingItem) {
                // Update only the fields that are provided in the payload
                Object.keys(updatedItem).forEach(key => {
                    if (key !== 'id') {
                        existingItem[key] = updatedItem[key];
                    }
                });
            }
        },
    },
});

export const { addItem, removeItem, updateItem } = ProductsSlice.actions;

export default ProductsSlice.reducer;