import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    status: null,
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {

    }
})

export default productSlice.reducer