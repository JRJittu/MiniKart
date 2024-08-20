import { useState } from "react"
import { useParams, Navigate, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
    useGetProductByIdQuery,
    useCreateReviewsMutation
} from "../../redux/api/productApiSlice"
import Loader from "../../components/loader"
import Message from "../../components/message"

import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from "moment"
import HeartIcon from "./heartIcon"
import Ratings from "./ratings"
import ProductTabs from "./productTabs"

import { addToCart } from "../../redux/features/cart/cartslice"

const ProductDetails = () => {
    const { id: pId } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const { userInfo } = useSelector(state => state.auth)

    const { data: product, isLoading, refetch, error } = useGetProductByIdQuery(pId)
    const [ createReview, {isLoading: LoadingReview}] = useCreateReviewsMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const result = await createReview({pId, rating, comment}).unwrap()
            refetch()
            toast.success("Review Added Successfully")

        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    return <>
        <div className="mt-5 md:ml-40 ml-10">
            {isLoading ? (<Loader />) : error ? (
                <Message variant="Danger">{error?.data?.message || error.message}</Message>
            ) : <>
                <div className="flex flex-wrap relative items-between mt-[2rem]">
                    <div>
                        <img src={product.image} alt={product.pName}
                            className="w-full xl:w-[35rem] lg:w-[30rem] md:w-[25rem] sm:w-[20rem] m-[2rem] border" />
                        <HeartIcon product={product} />
                    </div>

                    <div className="flex flex-col ml-5">
                        
                        <h2 className="text-2xl font-bold my-4">{product.pName}</h2>
                        <p className="my-4 xl:w-[36rem] lg:w-[35rem] md:w-[30rem] sm:w-[25rem]">{product.description}</p>
                        <p className="text-4xl my-4 font-extrabold text-pink-900" >₹{product.price}</p>

                        <div className="flex items-center justify-between w-[36rem]">
                            <div className="one w-[18rem]">
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaStore className="mr-2" />Brand: {" "} {product.brand}
                                </h1>
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaClock className="mr-2" />Added: {" "} {moment(product.createdAt).fromNow()}
                                </h1>
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaStar className="mr-2" />Reviews: {" "} {product.numReviews}
                                </h1>
                            </div>
                            <div className="two w-[18rem]">
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaStar className="mr-2" />Ratings: {" "} {product.net_rating}
                                </h1>
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaShoppingCart className="mr-2" />Quantity: {" "} {product.quantity}
                                </h1>
                                <h1 className="flex items-center my-3 font-semibold">
                                    <FaBox className="mr-2" />In Stock: {" "} {product.countInStock}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between my-4">
                            <Ratings value={product.net_rating} text={`${product.numReviews} reviews`} />
                            
                            {product.countInStock > 0 && (
                                <div> 
                                    Qty
                                    <select value={qty} onChange={e => setQty(e.target.value)}
                                        className="p-2 w-[4rem] rounded-lg text-black"
                                        >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))}
                                        {/* .keys() gives an array of 0...n for iteration  */}
                                    </select>
                                </div>
                            )}
                        </div>
                        
                        <div className="btn-container">
                            <button 
                                onClick={addToCartHandler}
                                disabled={product.countInStock===0} 
                                className="bg-pink-500 text-black py-2 px-4 mt-4 md:mt-0 rounded-lg hover:bg-pink-600">
                                    Add To Cart
                            </button>
                        </div>

                    </div>

                    <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                        <ProductTabs 
                            loadingProductRev={LoadingReview} 
                            userInfo={userInfo} 
                            submitHandler={submitHandler}
                            rating={rating} 
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}   
                            product={product} 
                        />
                    </div>
                </div>

            </>
            }
        </div>
    </>
}

export default ProductDetails