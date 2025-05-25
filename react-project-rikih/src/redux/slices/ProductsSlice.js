import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import myImage from '../../images/1.jpg'; // Import the image
import Img1 from '../../images/1.jpg'; // Import the image
import Img2 from '../../images/2.png'; // Import the image
import Img3 from '../../images/3.png'; // Import the image
import Img4 from '../../images/4.png'; // Import the image
import Img5 from '../../images/5.png';

const initialState = {
    oneProduct: {
        id: uuidv4(), // Unique ID for the product
        image: '', // Image URL of the product
        name: '', // Name of the product
        description: '', // Description of the product
        quantity:0, // Quantity of the product in the cart
        price: 0, // Price of the product
        category: 'null',
         // Price of the product
            meuhedet: 0,
            maccabi: 0,
            leumit: 0,
            clalit: 0,        
            }, // Object to hold a single product item
            
            products: [
            {
                id: uuidv4(),
                image: Img2,
                name: 'Product 1',
                description: 'Description for Product 1',
                quantity:1,
                category: 'kids',
                price: 100,
                meuhedet: 90,
                maccabi: 95,
                leumit: 85,
                clalit: 80,
            },
            {
                id: uuidv4(),
                image: Img3,
                name: 'Product 2',
                description: 'Description for Product 2',
                quantity:1,
                category: 'women',
                price: 200,
                meuhedet: 180,
                maccabi: 190,
                leumit: 170,
                clalit: 160,
            },
            {
                id: uuidv4(),
                image: Img4,
                name: 'Product 3',
                description: 'Description for Product 3',
                quantity:1,
                category: 'men',
                price: 300,
                meuhedet: 270,
                maccabi: 285,
                leumit: 255,
                clalit: 240,
            },
            ], // Array to hold products items
    
    totalProducts: 3, // Total number of items in the products
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
            state.items.push({
                id: newItem.id,
                image: newItem.image,
                name: newItem.name,
                description: newItem.description,
                price: newItem.price,
                meuchedet: newItem.meuchedet || newItem.price,
                macabi: newItem.macabi || newItem.price,
                leumit: newItem.leumit || newItem.price,
                clalit: newItem.clalit || newItem.price,
            });
            }
            else{
                existingItem.quantity += 1;
            }
            state.totalProducts += 1;
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

export const { addItem, removeItem, updateItem } = productsSlice.actions;

export default productsSlice.reducer;