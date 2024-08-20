import {apiSlice} from "./apiSlice"
import { ORDER_URL, PAYMENT_URL } from "../constants"

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: 'POST',
                body: order
            })
        }),

        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`
            })
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDER_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            })
        }),

        getMyOrder: builder.query({
            query: () => ({
                url: `${ORDER_URL}/mine`
            }),
            keepUnusedDataFor: 5
        }),

        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDER_URL}/${orderId}/deliver`,
                method: 'PUT'
            })
        }),

        allOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}`
            })
        }),

        totalOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}/total-orders`
            })
        }),

        totalSales: builder.query({
            query: () => ({
                url: `${ORDER_URL}/total-sales`
            })
        }),

        totalSalesPerDate: builder.query({
            query: () => ({
                url: `${ORDER_URL}/total-sales-per-date`
            })
        }),
    })
})

export const {
    
    useAllOrdersQuery,
    useCreateOrderMutation,
    useDeliverOrderMutation,
    useGetMyOrderQuery,
    useGetOrderDetailsQuery,
    useTotalOrdersQuery,
    useTotalSalesQuery,
    useTotalSalesPerDateQuery,
    usePayOrderMutation,

} = orderApiSlice