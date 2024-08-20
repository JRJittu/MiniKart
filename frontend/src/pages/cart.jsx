import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa"
import { addToCart, removeFromCart } from "../redux/features/cart/cartslice"

function Cart() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeFromCartHandler = (pId) => {
        dispatch(removeFromCart(pId))
    }

    const PaymentHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return <>
        <div className="container flex justify-aroung items-start flex-wrap mx-auto mt-8">
            {cartItems.length === 0 ? (<div>
                Your cart is empty.  <Link to='/shop' className="text-red-500 font-bold text-0.xl">Go to Shop</Link>
            </div>) : (
                <>
                    <div className="flex flex-col sm:w-[80%] xl:w-[40%] ml-10">
                        <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>

                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center mb-[3rem] p-2 border">
                                <div className="w-[10rem] h-[10rem] border">
                                    <img src={item.image} alt={item.pName} className="w-full h-full rounded" />
                                </div>

                                <div className="flex-1 ml-3 pl-2 ">
                                    <Link to={`/product/${item._id}`} className="font-semibold hover:font-bold text-xl">{item.pName}</Link>
                                    <div className="mt-2 font-semibold">{item.brand}</div>
                                    <div className="mt-2 text-red-500 text-xl font-bold">₹{item.price}</div>
                                </div>

                                <div className="w-24">
                                    <select
                                        className="w-full p-1 border rounded"
                                        value={item.qty}
                                        onChange={e => addToCartHandler(item, e.target.value)}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <button
                                        className="text-red-500 text-2xl mr-[2rem] rounded"
                                        onClick={() => removeFromCartHandler(item._id)}
                                    >
                                        <FaTrash className="ml-4 mt-1" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 w-[35rem]">
                            <div className="p-4 flex flex-col border border-pink-900 items-center">
                                <h2 className="text-xl font-semibold my-2">
                                    Total Items : { cartItems.reduce((acc, item) => acc + Number(item.qty) , 0) }
                                </h2>

                                <div className="text-2xl text-red-700 font-bold my-2">
                                    ₹ {cart.itemsPrice}
                                </div>

                                <button 
                                    className="px-4 py-2 my-2 rounded-lg bg-pink-500 hover:bg-pink-600 w-full"
                                    disabled={cartItems.length===0}
                                    onClick={PaymentHandler}
                                >        
                                    Proceed To Place Order
                                </button>
                            </div> 
                        </div>
                    </div>
                </>
            )}
        </div>
    </>
}

export default Cart