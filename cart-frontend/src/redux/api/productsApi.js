// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
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
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`
            }),
            providesTags: ['products']
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: builder.mutation({
            query: ({id, product}) => ({
                url: `products/${id}`,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['products']
        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery, useGetSingleProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi
