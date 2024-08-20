import { useState } from "react"
import { Link } from "react-router-dom"
import Ratings from "./ratings"
import { useTopProductsQuery } from "../../redux/api/productApiSlice"
import SmallProduct from "./smallProduct"
import Loader from "../../components/loader"


const ProductTabs = ({
    loadingProductRev,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product
}) => {
    const { data, isLoading } = useTopProductsQuery()
    const [activeTab, setActiveTab] = useState(1)

    if (isLoading) {
        return <Loader />
    }

    const isReviewed = product.reviews.some((rev) => rev.user === userInfo._id)

    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }

    return <div className="flex flex-col lg:flex-row">
        <section className="mr-[5rem] w-[15rem]">
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""} ${isReviewed ? "text-green-600" : ""}`}
                onClick={() => handleTabClick(1)}>
                {`${isReviewed ? "Already Reviewed" : " Write Your Review "}`}
            </div>

            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`}
                onClick={() => handleTabClick(2)}>
                All Reviews
            </div>

            <div className={`flex-1 p-4 mb-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ""}`}
                onClick={() => handleTabClick(3)}>
                Related Products
            </div>
        </section>

        {/* Second Part */}
        <section>
            {activeTab === 1 && !isReviewed && (
                <div className="mt-4">
                    {userInfo ? (
                        <form onSubmit={submitHandler}>

                            <div className="my-4">
                                <label htmlFor="rating" className="block text-xl mb-2">Rating</label>
                                <select id="rating" required value={rating} onChange={e => setRating(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[20rem]">
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="my-4">
                                <label htmlFor="comment" className="block text-xl mb-2">Comment</label>
                                <textarea id="comment" rows="3" required value={comment} onChange={e => setComment(e.target.value)}
                                    className="p-2 border rounde-lg xl:w-[20rem]"
                                ></textarea>
                            </div>

                            <button type="submit" disabled={loadingProductRev}
                                className="bg-green-500 text-black py-2 px-4 rounded-lg hover:bg-green-600"
                            >
                                Submit
                            </button>

                        </form>
                    ) : (
                        <p>Please <Link to='/login' className="text-red-500 font-semibold">Sing in</Link> to write review</p>
                    )}
                </div>
            )}
        </section>

        <section>
            {activeTab === 2 && (<>
                {product.reviews.length === 0 && <p>No reviews</p>}
                <div>
                    {product.reviews.map((rev) => (
                        <div key={rev._id}
                            className="bg-gray-200 p-4 my-3 rounded-lg xl:ml-[2rem] sm:ml-0 xl:w-[35rem] sm:w-[25rem]">
                            
                            <div className="flex justify-between">
                                <strong className="text-red-700 font-bold">{rev.user_name}</strong>
                                <p className="text-black">{rev.createdAt.substring(0,10)}</p>
                            </div>

                            <p className="my-4">{rev.comment}</p>
                            <Ratings value={rev.rating} />
                        </div>
                    ))}
                </div>
            </>
            )}
        </section>

        <section>
            {activeTab === 3 && (
                <section className="ml-[2rem] flex flex-wrap">
                    {!data ? <Loader/> : (
                        data.map((prod) => (
                            <div key={prod._id}>
                                <SmallProduct product={prod}/>
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>

    </div>
}

export default ProductTabs