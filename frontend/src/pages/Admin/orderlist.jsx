import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Message from '../../components/message';
import Loader from '../../components/loader';
import { useAllOrdersQuery } from '../../redux/api/orderApiSlice';
import AdminMenu from './adminMenu';

const Orderlist = () => {
    const { data: orders, refetch ,isLoading, error } = useAllOrdersQuery();

    useEffect(() => {
        refetch()
    }, [orders, refetch])

    return (
        <div className='container mx-auto p-4'>
            <h2 className="text-3xl font-bold my-4 text-blue-700 underline">Orders</h2>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.error || error.message}</Message>
            ) : (
                <div className="overflow-x-auto">
                    <AdminMenu />
                    <table className='min-w-full bg-white'>
                        <thead>
                            <tr className='text-red-500 font-bold'>
                                <th className='py-2 text-center'>ORDERS</th>
                                <th className='py-2 text-center'>ID</th>
                                <th className='py-2 text-center'>TOTAL</th>
                                <th className='py-2 text-center'>USER</th>
                                <th className='py-2 text-center'>PAID</th>
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
                                    <td className='py-2 text-center'>{order.userId ? order.userId.username : "NA"}</td>
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
    );
}

export default Orderlist;
