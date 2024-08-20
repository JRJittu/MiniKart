import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Message from "../../components/message"
import Loader from "../../components/loader"

import {
    useGetOrderDetailsQuery,
    useDeliverOrderMutation
} from "../../redux/api/orderApiSlice"

const Order = () => {
    const { id: orderId } = useParams()

    const {userInfo} = useSelector((state) => state.auth)

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()

    const deliverHandler = async () => {
        await deliverOrder(orderId)
        refetch()
    }

    return <>
        {isLoading ? (<Loader />) : error ? (
            <Message variant="danger">{error.message}</Message>
        ) : (
            <div className="container flex flex-col ml-[10rem] md:flex-row">
                <div className="md:w-2/3 pr-4">
                    <div className="border-gray-100 my-5 pb-4">
                        {order.orderItems.length === 0 ? (
                            <Message>No current Orders</Message>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-[80%]">
                                    <thead className="border-b-2 font-bold text-red-500">
                                        <tr>
                                            <th className="p-2">Image</th>
                                            <th className="p-2">Product</th>
                                            <th className="p-2">Quantity</th>
                                            <th className="p-2">Unit Price</th>
                                            <th className="p-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index} className="font-semibold">
                                                <td className="p-2 ">
                                                    <Link to={`/product/${item.product}`}>
                                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                                    </Link>
                                                </td>
                                                <td className="p-2">
                                                    <Link to={`/product/${item.product}`} className="font-semibold hover:underline">{item.name}</Link>
                                                </td>
                                                <td className="p-2 text-center">{item.qty}</td>
                                                <td className="p-2 text-center">₹{item.price.toFixed(2)}</td>
                                                <td className="p-2 text-center">₹{(item.qty * item.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:w-1/3">
                    <div className="mt-5 bg-gray-100 p-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">Deliver To</h2>
                        <p className="mb-4 mt-4">
                            <strong className="text-pink-600">Order: </strong> {order._id}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-600">Name: </strong> {order.userId.username}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-600">Email: </strong> {order.userId.email}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-600">Address: </strong>
                            {order.shippingAddress.address} {", "} {order.shippingAddress.city} {" "} {order.shippingAddress.postalCode}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-600">Method: </strong> {order.paymentMethod}
                        </p>

                        {order.isPaid ? (<>
                            <strong className="text-pink-600">Paid On: </strong>
                            <span className="bg-gray-300 px-4 py-1 rounded-xl">{order.paidAt.substring(0, 10)}</span>
                        </>) : (<>
                            <strong className="text-pink-600">Payment: </strong>
                            <span className="bg-gray-300 px-4 py-1 rounded-xl">Not Paid</span>
                        </>)}

                    </div>

                    <div className="bg-gray-100 p-4 mt-8">
                        <h2 className="text-xl font-bold mb-2"> Order Summary </h2>
                        <ul className="text-lg">
                            <li>
                                <span className="font-semibold mb-4">Items Price: </span>
                                <span className="font-semibold text-pink-800">₹{order.itemsPrice}</span>
                            </li>
                            <li>
                                <span className="font-semibold mb-4">Shipping Price: </span>
                                <span className="font-semibold text-pink-800">₹{order.shippingPrice}</span>
                            </li>
                            <li>
                                <span className="font-semibold mb-4">Tax Price: </span>
                                <span className="font-semibold text-pink-800">₹{order.taxPrice}</span>
                            </li>
                            <li className="mt-2">
                                <span className="font-semibold mb-4">Total Price: </span>
                                <span className="font-semibold text-red-500">₹{order.totalPrice}</span>
                            </li>
                        </ul>
                    </div>

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && (
                        <div>
                            {order.isDelivered ? (
                                <div className="w-full bg-green-500 py-2 rounded full text-center rounded-full mb-10">Delivered ☑</div>
                            ) : (
                                <button
                                    type="submit" onClick={deliverHandler}
                                    className="w-full bg-pink-500 text-white py-2 hover:bg-pink-600 rounded-full mb-10">
                                    Mark As Deliver
                                </button>
                            )}

                            <Link to='/admin/orderlist' className="text-blue-500 font-semibold text-xl hover:underline hover:font-bold">
                                Click to Orders
                            </Link>
                        </div>
                    )}
                </div>
            </div >
        )
        }

    </>

}

export default Order