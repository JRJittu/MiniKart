import Header from "../components/header"
import { Link, useParams } from "react-router-dom"
import { useGetProductByKeyQuery } from "../redux/api/productApiSlice"
import Loader from "../components/loader"
import Message from "../components/message"
import ProductComp from "./Products/productComp"

const Home = () => {
    const { keyeword } = useParams()
    const { data, isLoading, isError } = useGetProductByKeyQuery({ keyeword })

    return <>
        {!keyeword ? <Header /> : null}
        {isLoading ? <Loader /> : isError ? (
            <Message variant="danger">{isError?.data.message || isError.error}</Message>
        ) : (<>
            <div className="flex justify-center items-center mt-10 ">
                <h1 className=" text-3xl mx-10 my-[3rem]">Special Products </h1>
                <Link to='/shop'
                    className="bg-pink-500 hover:bg-pink-700 font-bold rounded-full py-2 px-10 ml-10 my-[3rem]">
                    Shop
                </Link>
            </div>

            <div className="flex justify-center flex-wrap mt-[2rem] mx-10">
                {data.products.map((product) => (
                    <div key={product._id} className="border flex items-center mx-1 my-1" > <ProductComp product={product} />  </div>
                ))}
            </div>
        </>)
        }
    </>
}

export default Home