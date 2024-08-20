import { Link } from "react-router-dom";
import moment from 'moment';
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./adminMenu";
import Loader from "../../components/loader";

const AllProducts = () => {
    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error in Loading Products</div>;
    }

    return (
        <div className="container mx-[9rem]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="p-3">

                    <div className="flex justify-center text-red-500 ml-[2rem] text-2xl font-bold py-4">
                        All Products ({products ? products.length : 0})
                    </div>
                    <hr />

                    <div className="flex flex-wrap justify-around items-center my-4">
                        {products && products.map((product) => (
                            <Link
                                key={product._id}
                                to={`/admin/product/update/${product._id}`}
                                className="block m-5 overflow-hidden border border-gray-300"
                            >
                                <div className="flex">
                                    <img
                                        src={product.image}
                                        alt={product.pName}
                                        className="w-[10rem]"
                                    />
                                    <div className="p-4 flex flex-col justify-around">
                                        <div className="flex justify-between">
                                            <h5 className="text-xl text-blue-500 font-semibold my-2">{product?.pName}</h5>

                                            <p className="text-black text-sm">
                                                {moment(product.createAt).format("MMM Do YYYY")}
                                            </p>
                                        </div>

                                        <p className="text-black xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm my-3">
                                            {`${product?.description.substring(0, 160)}${product?.description.length < 160 ? "" : "..."}`}
                                        </p>


                                        <div className="flex justify-between">
                                            <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black 
                                                bg-pink-500 rounded-lg hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-pink-800 
                                                dark:bg-pink-500 dark:hover:bg-pink-700 dark:focus:ring-pink-800">

                                                Update Product
                                                <svg className="w-3.5 h-3.5 ml-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="font-semibold text-xl">₹ {product?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
