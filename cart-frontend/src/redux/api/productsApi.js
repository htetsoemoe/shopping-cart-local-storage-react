// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["products"], // auto-refetching

    /*
     Endpoints are just a set of operations that you want to perform against your server.
     You define them as an object using the builder syntax. There are two basic endpoint types: query and mutation.
    */
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: `products`,
            }),
            providesTags: ['products']
        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllProductsQuery} = productsApi
