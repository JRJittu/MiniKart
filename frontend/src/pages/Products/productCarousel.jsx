import { useTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/message"
import Slider from 'react-slick'

/* File imported that apply styles on slider */
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './sliderStyle.css'

import moment from "moment"
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa"

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useTopProductsQuery()
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        SlidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (<div className="mb-4 xl:block lg:block md:block">
        {isLoading ? null : error ? (
            <Message variant='danger'>{error?.data?.message || error.message}</Message>
        )
            :
            (<Slider {...settings} className="xl:w=[45rem] lg:w-[45rem] md:w-[40rem] sm:w-[35rem] sm:block">
                {
                    products.map(({ image, _id, pName, price, description, brand, createdAt,
                        numReviews, net_rating, countInStock, quantity, reviews }) => (
                        <div key={_id} >
                            <img src={image} alt={pName} className="w-full rounded-lg h-[30rem]" ></img>
                            <br /><hr /><br />
                            <div className="flex justify-between w-full">

                                <div className="one w-[40%] p-3">
                                    <h2 className="font-bold">{pName}</h2>
                                    <p className="text-red-500 font-semibold">₹ {price}</p>
                                    <p>
                                        {`${description.substring(0, 160)}${description.length < 160 ? "" : "....."}`}
                                    </p>
                                </div>

                                <div className="flex justify-between w-[60%] p-3">
                                    <div className="one">
                                        <h1 className="flex items-center mb-6">
                                            <FaStore className="mr-1 text-black" />Brand: {brand}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaClock className="mr-1 text-black" />Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaStar className="mr-1 text-black" />Reviews: {numReviews}
                                        </h1>
                                    </div>

                                    <div className="two">
                                        <h1 className="flex items-center mb-6">
                                            <FaStar className="mr-2 text-black" /> Ratings:{" "}{Math.round(net_rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaShoppingCart className="mr-2 text-black" /> Quantity: {quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6">
                                            <FaBox className="mr-2 text-black" /> Count In Stocks:{countInStock}
                                        </h1>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                    )
                }
            </Slider>)
        }

    </div>
    )
}

export default ProductCarousel