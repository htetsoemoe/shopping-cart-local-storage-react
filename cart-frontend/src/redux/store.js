import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./services/productSlice"
import { productsApi } from "./api/productsApi"

export const store = configureStore({
    reducer: {
        productSlice: productSlice,
        [productsApi.reducerPath] : productsApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation,
    // polling and other useful features of 'rtk-query'.
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware)
})