import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, image, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ id, name, price, image, quantity });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;