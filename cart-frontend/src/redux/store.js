import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./services/productSlice"

export const store = configureStore({
    reducer: {
        productSlice: productSlice
    }
})