import { useNavigate } from "react-router-dom";

const OrderPayment = () => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate('/user-orders')
    }

    return (
        <>
            <div className="min-h-screen w-full bg-green-500 flex flex-col items-center justify-center">
                <h1 className="text-center text-xl font-bold mb-8">Payment Done Successfully 👍</h1>
                <h1 className="text-center text-3xl font-bold text-red-600">Order is Place ✅</h1>
                <button
                    className="py-2 px-4 mt-5 rounded-xl bg-purple-400 hover:bg-purple-600 text-semibold"
                    onClick={clickHandler}
                >
                    Track Order 👉
                </button>
            </div>
        </>
    );
};

export default OrderPayment;
