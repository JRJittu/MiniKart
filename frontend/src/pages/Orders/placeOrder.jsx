import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import ProgressSteps from "../../components/progressSteps";
import Loader from "../../components/loader";

import {
    useCreateOrderMutation,
    usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartslice";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);

    const [createOrder, { isLoading: isCreatingOrder, error: createOrderError }] = useCreateOrderMutation();
    const [payOrder, { isLoading: isPayingOrder }] = usePayOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address || !cart.paymentMethod) {
            navigate('/shipping');
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    const handlePayment = async () => {
        try {
            const orderResponse = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod
            }).unwrap();

            console.log("Order is created ")

            await payOrder({
                orderId: orderResponse._id,
                details: {
                    id: orderResponse._id,
                    status: "paid",
                    updateTime: Date.now(),
                    emailAddr: userInfo.email
                }
            }).unwrap();

            toast.success("Order is placed...😍");
            dispatch(clearCartItems());
            navigate(`/payment-done`);

        } catch (error) {
            toast.error(error?.data?.message || "An error occurred during payment.");
        }
    };

    return (
        <>
            <ProgressSteps step1 step2 step3 />

            <div className="container mx-auto mt-[5rem]">
                {cart.cartItems.length === 0 ? (
                    <Message>Your Cart is Empty</Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="font-bold text-red-500">
                                <tr>
                                    <td className="px-1 py-2 text-left align-top">Image</td>
                                    <td className="px-1 py-2 text-left align-top">Product</td>
                                    <td className="px-1 py-2 text-left align-top">Quantity</td>
                                    <td className="px-1 py-2 text-left align-top">Price</td>
                                    <td className="px-1 py-2 text-left align-top">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <Link to={`/product/${item._id}`}>
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                            </Link>
                                        </td>
                                        <td className="p-2">
                                            <Link to={`/product/${item._id}`} className="font-semibold hover:underline">
                                                {item.pName}
                                            </Link>
                                        </td>
                                        <td className="p-2">{item.qty}</td>
                                        <td className="p-2">₹{item.price.toFixed(2)}</td>
                                        <td className="p-2">₹{(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-10 mb-5 text-2xl font-bold">Order Summary</div>
                <div className="flex justify-between flex-wrap p-8 bg-gray-100">
                    <ul className="text-lg">
                        <li>
                            <span className="font-semibold mb-4">Items Price: </span>
                            <span className="font-semibold text-pink-800">₹{cart.itemsPrice}</span>
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Shipping Price: </span>
                            <span className="font-semibold text-pink-800">₹{cart.shippingPrice}</span>
                        </li>
                        <li>
                            <span className="font-semibold mb-4">Tax Price: </span>
                            <span className="font-semibold text-pink-800">₹{cart.taxPrice}</span>
                        </li>
                        <li className="mt-2">
                            <span className="font-semibold mb-4">Total Price: </span>
                            <span className="font-semibold text-red-500">₹{cart.totalPrice}</span>
                        </li>
                    </ul>

                    {createOrderError && <Message variant="danger">{createOrderError?.data?.message}</Message>}

                    <div className="mt-5">
                        <h2 className="text-2xl font-semibold mb-2">Deliver At</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}
                        </p>
                    </div>

                    <div className="mt-5">
                        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
                        <strong>Method: </strong> {cart.paymentMethod}
                    </div>
                </div>

                {!isPayingOrder && (
                    <button
                        type="button"
                        disabled={cart.cartItems.length === 0}
                        onClick={handlePayment}
                        className="bg-green-500 text-black py-2 px-4 w-full hover:bg-green-600 rounded-xl"
                    >
                        Proceed to pay
                    </button>
                )}
                {(isPayingOrder || isCreatingOrder) && <Loader />}
            </div>
        </>
    );
};

export default PlaceOrder;
