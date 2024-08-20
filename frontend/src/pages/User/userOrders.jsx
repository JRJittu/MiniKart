import { Link } from 'react-router-dom';
import Message from '../../components/message';
import Loader from '../../components/loader';
import { useGetMyOrderQuery } from '../../redux/api/orderApiSlice';

const UserOrders = () => {
    const { data: orders, isLoading, error } = useGetMyOrderQuery();

    return (
        <div className='container mx-auto p-4'>
            <h2 className="text-3xl font-bold my-4 text-blue-700 underline">My Orders</h2>

            {/* This div is only shown on small screens */}
            <div className='block md:hidden'>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error?.data?.error || error.message}</Message>
                ) : (
                    <div className='flex flex-col'>
                        {orders.map((order) => (
                            <div key={order._id} className='flex flex-col items-center justify-center bg-gray-100 mb-4 p-4 border border-gray-300 rounded'>
                                <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='object-cover w-20 h-20 mb-2' />
                                <p className='mb-2 font-semibold'>
                                    <span className='font-bold text-purple-900'>Id: </span>
                                    {order._id}
                                </p>
                                <p className='mb-2 font-semibold'>
                                    <span className='font-bold text-purple-900'>Total: </span>
                                    ₹{order.totalPrice.toFixed(2)}
                                </p>
                                <p className='mb-2 font-semibold'>
                                    <span className='font-bold text-purple-900'>Date: </span>
                                    {order.createdAt.substring(0, 10)}
                                </p>
                                <p className='mb-2 font-semibold'>
                                    <span className='font-bold text-purple-900'>Payment: </span>
                                    {order.isPaid ? `Paid - ${order.paidAt.substring(0, 10)}` : "Pending...❌"}
                                </p>
                                <p className='mb-2 font-semibold'>
                                    <span className='font-bold text-purple-900'>Delivered: </span>
                                    {order.isDelivered ? `Delivered - ${order.deliveredAt.substring(0, 10)}` : "Pending...❌"}
                                </p>

                                <Link to={`/order/${order._id}`}>
                                    <button className='bg-pink-300 text-black font-bold py-2 px-3 rounded-full hover:bg-pink-400'>
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* This div is only shown on medium and larger screens */}
            <div className='hidden md:block'>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error?.data?.error || error.message}</Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full bg-white'>
                            <thead>
                                <tr className='text-red-500 font-bold'>
                                    <th className='py-2 text-center'>IMAGE</th>
                                    <th className='py-2 text-center'>ID</th>
                                    <th className='py-2 text-center'>TOTAL</th>
                                    <th className='py-2 text-center'>DATE</th>
                                    <th className='py-2 text-center'>PAYMENT</th>
                                    <th className='py-2 text-center'>DELIVERED</th>
                                    <th className='py-2 text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className='font-semibold'>
                                        <td className='py-2 text-center'>
                                            <img
                                                src={order.orderItems[0].image}
                                                alt={order.orderItems[0].name}
                                                className='object-cover h-20 w-20 mb-5 border border-gray-500 mx-auto'
                                            />
                                        </td>
                                        <td className='py-2 text-center'>{order._id}</td>
                                        <td className='py-2 text-center text-xl text-pink-800'>
                                            ₹{order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className='py-2 text-center'>{order.createdAt.substring(0, 10)}</td>
                                        <td className='py-2 text-center'>
                                            {order.isPaid ? (
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-xl mb-2'>Paid ✅</p>
                                                    <p className='text-sm'>{order.paidAt.substring(0, 10)}</p>
                                                </div>
                                            ) : (
                                                <p className='text-xl'>Pending ❌</p>
                                            )}
                                        </td>
                                        <td className='py-2 text-center'>
                                            {order.isDelivered ? (
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-xl mb-2'>Delivered ✅</p>
                                                    <p className='text-sm'>{order.deliveredAt.substring(0, 10)}</p>
                                                </div>
                                            ) : (
                                                <p className='text-xl'>Pending...</p>
                                            )}
                                        </td>
                                        <td className='py-2 text-center'>
                                            <Link to={`/order/${order._id}`}>
                                                <button className='bg-pink-300 text-black font-bold py-2 px-3 rounded-full hover:bg-pink-400'>
                                                    View Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserOrders;
