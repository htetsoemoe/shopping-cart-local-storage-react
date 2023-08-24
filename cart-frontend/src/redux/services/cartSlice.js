import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart(state, action) {
            // check added product which is already exist in cart
            const existingIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )

            // already exist in cart
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = { 
                    ...state.cartItems[existingIndex], 
                    cartQuantity: state.cartItems[existingIndex].cartQuantity += 1 
                }
            } else { // if new product
                const tempProductItem = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProductItem)
            }
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer