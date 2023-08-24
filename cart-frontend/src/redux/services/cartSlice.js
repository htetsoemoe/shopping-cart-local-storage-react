import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

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
                toast.info("Increased Product Quantity!", {
                    position: "bottom-left"
                })
            } else { // if new product
                const tempProductItem = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProductItem)
                toast.success("Product was added to cart!", {
                    position: "bottom-left"
                })
            }
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer