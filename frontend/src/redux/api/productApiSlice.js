import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import {apiSlice} from "./apiSlice"

// default method is GET

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProductByKey: builder.query({
            query:({keyword})=>({
                url: `${PRODUCT_URL}`,
                params: {keyword},
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),

        getProductById: builder.query({
            query: (pId)=>({
                url: `${PRODUCT_URL}/${pId}`
            }),
            providesTags: (result, error, pId) => [ {type: "Product", id: pId} ]
        }),

        allProducts: builder.query({
            query: () => ({url: `${PRODUCT_URL}/allProducts`}),
            keepUnusedDataFor: 5
        }),

        topProducts: builder.query({
            query:() => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5
        }),

        newProducta: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: (data)=>({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),

        updateProduct: builder.mutation({
            query: ({pId, formData}) => ({
                url: `${PRODUCT_URL}/${pId}`,
                method: 'PUT',
                body: formData,
            })
        }),

        deleteProduct: builder.mutation({
            query: (pId) => ({
                url: `${PRODUCT_URL}/${pId}`,
                method: 'DELETE',
            }),
            providesTags: ['Product']
        }),

        createReviews: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.pId}/reviews`,
                method: 'POST',
                body: data
            })
        }),

        uploadImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        }),

        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCT_URL}/filtered-products`,
                method: 'POST',
                body: {checked, radio}
            })
        })
    })
})

export const {

    useGetProductByKeyQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useTopProductsQuery,
    useNewProductaQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewsMutation,
    useUploadImageMutation,
    useGetFilteredProductsQuery
} = productApiSlice