import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    searchProduct: "",
}

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProduct: (state, {payload}) => {
            state.products = payload
        },
        setSearchProduct: (state, {payload}) => {
            state.searchProduct = payload
        },
    }
})

export const {addProduct, setSearchProduct} = productSlice.actions
export default productSlice.reducer