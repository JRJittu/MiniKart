import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory : builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory,
            })
        }),

        updateCategory: builder.mutation({
            query: ({catId, updateCat}) => ({
                url: `${CATEGORY_URL}/${catId}`,
                method: 'PUT',
                body: updateCat,
            })
        }),

        deleteCategory: builder.mutation({
            query: (catId) => ({
                url: `${CATEGORY_URL}/${catId}`,
                method: 'DELETE',
            })
        }),

        fetchAllCategory: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categorylist`
            })
        })
    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchAllCategoryQuery,

} = categoryApiSlice