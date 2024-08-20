import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartslice"

import ProgressSteps from "../../components/progressSteps"


const Shipping = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [payMethod, setPayMethod] = useState('PhonePay')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPost] = useState(shippingAddress.postalCode || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    /* Payement */
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [navigate, shippingAddress]) 

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingAddress({address, city, postalCode}))
        dispatch(savePaymentMethod(payMethod))
        navigate('/placeorder')
    }

    return <div className="container mx-auto mt-10">
        <ProgressSteps step1 step2 /> 
        <div className="mt-[10rem] flex justify-around flex-wrap">
            <form className="w-[40rem]" onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold mb-8">Shipping</h1>

                <div className="mb-8">
                    <label className="block mb-2">Address</label>
                    <input
                        type="text"
                        value={address}
                        placeholder="Enter Address" required
                        className="w-full p-2 border rounded-lg"
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2">City</label>
                    <input
                        type="text"
                        value={city}
                        placeholder="Enter City" required
                        className="w-full p-2 border rounded-lg"
                        onChange={e => setCity(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2">Postal Code</label>
                    <input
                        type="text"
                        value={postalCode}
                        placeholder="Enter Postal Code" required
                        className="w-full p-2 border rounded-lg"
                        onChange={e => setPost(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-3 font-bold">Select Payment Method</label>
                    <div className="mb-2">
                        <label htmlFor="" className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-pink-500"
                                name="paymentMethod"
                                value="PhonePay"
                                checked={payMethod === "PhonePay"}
                                onChange={e => setPayMethod(e.target.value)}
                            />

                            <span className="ml-2">Phone Pay</span>
                        </label>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="" className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-pink-500"
                                name="paymentMethod"
                                value="Paytm"
                                checked={payMethod === "Paytm"}
                                onChange={e => setPayMethod(e.target.value)}
                            />

                            <span className="ml-2">Paytm</span>
                        </label>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="" className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-pink-500"
                                name="paymentMethod"
                                value="GooglePay"
                                checked={payMethod === "GooglePay"}
                                onChange={e => setPayMethod(e.target.value)}
                            />

                            <span className="ml-2">Google Pay</span>
                        </label>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="" className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-pink-500"
                                name="paymentMethod"
                                value="CreditCard"
                                checked={payMethod === "CreditCard"}
                                onChange={e => setPayMethod(e.target.value)}
                            />

                            <span className="ml-2">Credit Card</span>
                        </label>
                    </div>

                </div>

                <button type="submit"
                    className="bg-pink-500 py-2 px-4 rounded-xl text-lg font-semibold hover:bg-pink-600 w-[50%]">
                    Continue
                </button>
            </form>
        </div>
    </div>
}

export default Shipping