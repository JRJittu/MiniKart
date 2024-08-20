import { useTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./loader";
import SmallProduct from "../pages/Products/smallProduct";
import ProductCarousel from "../pages/Products/productCarousel";

const Header = () => {
    const { data, refetch, isLoading, error } = useTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <div className="flex justify-around">
            <div className="xl:block lg:hidden md:hidden sm:hidden">
                <div className="grid ml-10 grid-cols-2">
                    {data?.map((product) => (
                        <div key={product._id} className="flex border mx-1 my-1 items-center">
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel/>
        </div>
    );
};

export default Header;
