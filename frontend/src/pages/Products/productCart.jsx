import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartslice"
import { toast } from "react-toastify"
import HeartIcon from "./heartIcon"

function ProductCart({ product }) {

    const dispatch = useDispatch()

    const addToCartHandler = (prod, qty) => {
        dispatch(addToCart({...prod, qty}))
        toast.success("Item added to cart")
    }

    return <div className="max-w-sm w-[25rem] relative shadow pb-2">
        <section className="relative mx-10 ">
            <Link to={`/product/${product._id}`}>
                <span className="absolute bottom-4 left-4 bg-pink-100 text-pink-800 text-sm 
                    font-medium mr-2 px-3 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">
                    {product.brand}
                </span>

                <img
                    src={product.image}
                    alt={product.pName}
                    style={{ height: '300px', width: "300px" }}
                    className="w-full cursor-pointer p-2"
                />
            </Link>
            <HeartIcon product={product} />
        </section>

        <div className="p-3 flex justify-between">
            <h5 className="mb-2 text-xl">{product?.pName}</h5>
            <p className="py-1 px-3 text-pink-700 font-semibold text-xl rounded-full">₹{product?.price}</p>
        </div>

        <p className="mb-3 font-normal text-gray-800 p-4">
            {`${product?.description.substring(0, 160)}${product?.description.length < 160 ? "" : "....."}`}
        </p>

        <button 
            onClick={() => addToCartHandler(product, 1)}
            className="px-3 py-2 rounded-full flex text-blue-800 mb-3 border border-blue-400 m-4 hover:bg-gray-200" 
        >
            <AiOutlineShoppingCart size={25} /> 
            <p className="ml-2">Add to Cart</p>
        </button>

    </div>
}

export default ProductCart