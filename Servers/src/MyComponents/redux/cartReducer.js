import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        nextId: 1  // Add this to keep track of the next available ID
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, image, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: state.nextId,  // Use the nextId for new items
                    name,
                    price,
                    image,
                    quantity
                });
                state.nextId += 1;  // Increment the nextId
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
            state.nextId = 1;  // Reset the nextId when clearing the cart
        },
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;