import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = (userId) => {
    if (!userId) return { items: [], totalQuantity: 0, totalPrice: 0 }; // Default state if userId is not provided

    try {
        if (typeof localStorage === 'undefined') {
            console.warn('localStorage is not available.');
            return { items: [], totalQuantity: 0, totalPrice: 0 };
        }

        const savedCart = localStorage.getItem(`cart_${userId}`);
        return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0, totalPrice: 0 };
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return { items: [], totalQuantity: 0, totalPrice: 0 };
    }
};

// Initial state (userId will be dynamically passed)
const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const { item , price } = action.payload; // Get the item from the payload
        
            // Check if the item already exists in the cart
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                // If the item exists, update its quantity and total price
                existingItem.quantity += 1;
                existingItem.totalPrice += price;
            } else {
                // If the item does not exist, add it to the cart
                state.items.push({
                    ...item,
                    quantity: 1, // Initialize quantity to 1
                    totalPrice: price, // Initialize total price
                });
            }
        
            // Update the total quantity and total price of the cart
            state.totalQuantity += 1;
            state.totalPrice += price;
        
            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
            alert(`המוצר ${item.name} נוסף לעגלה!`); // Notify the user
        },
        removeItem(state, action) {
            const { userId, id } = action.payload; // Get userId and item id from payload
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== id);

                // Save updated cart to localStorage
                localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
            }
        },
        clearCart(state, action) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        
            // Save the cleared cart to localStorage
            const userId = action.payload; // Assuming userId is passed in the action payload
            localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
        },
        updateQuantity(state, action) {
            const { id, quantity ,price } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                if (quantity <= 0) {
                    // אם הכמות היא 0 או פחות, הסר את המוצר
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    // עדכון הכמות והמחיר
                    existingItem.quantity = quantity;
                    existingItem.totalPrice = price * quantity;
                }

                // עדכון הסכומים הכוללים
                state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            }
        }
    },
});

export const { addItem, removeItem, clearCart ,updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;