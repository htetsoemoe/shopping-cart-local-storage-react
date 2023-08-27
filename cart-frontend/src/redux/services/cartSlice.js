import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const initialState = {
    // get cartItems from localStorage
    cartItems: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],
    cartSubTotal: 0,
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
                    cartQuantity: state.cartItems[existingIndex].cartQuantity += 1,
                    cartSubTotal: state.cartItems[existingIndex].cartSubTotal += state.cartItems[existingIndex].price
                }
                toast.info(`Increased ${state.cartItems[existingIndex].name} Quantity!`, {
                    position: "bottom-left"
                })
            } else { // if new product
                const tempProductItem = { ...action.payload, cartQuantity: 1, cartSubTotal: action.payload.price }
                state.cartItems.push(tempProductItem)
                toast.success(`${action.payload.name} was added to cart!`, {
                    position: "bottom-left"
                })
            }
            // After add new product or update product quantity, set cart to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseItemFromCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                state.cartItems[itemIndex].cartSubTotal -= state.cartItems[itemIndex].price

                toast.info(`Decreased ${action.payload.name} quantity!`, {
                    position: "bottom-left"
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCartItems = state.cartItems.filter(
                    item => item.id !== action.payload.id
                )

                state.cartItems = newCartItems

                toast.error(`${action.payload.name} was removed from cart!`, {
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getBalance(state, action) {
            const tax = 200

            let { subTotal, total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity, cartSubTotal } = cartItem

                    const itemTotal = price * cartQuantity

                    cartTotal.subTotal += cartSubTotal
                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal
                },
                {
                    subTotal: 0,
                    total: 0,
                    quantity: 0,
                }
            )
            
            // set reduce return values to redux states
            state.cartTotalQuantity = quantity
            state.cartSubTotal = subTotal
            state.cartTotalAmount = tax + subTotal
        }
    }
})

export const { addToCart, decreaseItemFromCart, getBalance } = cartSlice.actions
export default cartSlice.reducer