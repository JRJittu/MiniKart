import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchAllCategoryQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked, setRadio } from "../redux/features/shop/shopSlice";
import Loader from "../components/loader";
import ProductCart from "./Products/productCart";

function Shop() {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector((state) => state.shop);
    const [priceFilter, setPriceFilter] = useState('');

    const categoriesQuery = useFetchAllCategoryQuery();
    const filterProductsQuery = useGetFilteredProductsQuery({ checked, radio });

    // useEffect(() => {
    //     console.log("Products : ", products)
    // }, [products, priceFilter])

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (filterProductsQuery.data && (!checked.length && !radio.length)) {
            dispatch(setProducts(filterProductsQuery.data));
        }
    }, [checked, radio, filterProductsQuery.data, dispatch]);

    useEffect(() => {
        if (filterProductsQuery.data) {
            const filteredProducts = filterProductsQuery.data.filter(product => {
                return priceFilter==="" || product.price <= parseInt(priceFilter, 10);
            });
            dispatch(setProducts(filteredProducts));
        }
    }, [priceFilter, filterProductsQuery.data, dispatch]);

    const uniqueBrands = [
        ...new Set(
            filterProductsQuery.data?.map(product => product.brand).filter(brand => brand !== undefined)
        )
    ];

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter(item => item !== id);
        dispatch(setChecked(updatedChecked));
    };

    const handleBrandClick = (brand) => {
        const productsByBrand = filterProductsQuery.data.filter(product => product.brand === brand);
        dispatch(setProducts(productsByBrand));
    };

    const handlePriceFilter = (e) => {
        setPriceFilter(e.target.value);
    };

    const handleReset = () => {
        dispatch(setChecked([]));
        dispatch(setRadio([]));
        setPriceFilter('');
        dispatch(setProducts(filterProductsQuery.data));
        window.location.reload()
    };

    return (
        <div className="container mx-auto">
            <div className="flex md:flex-row sm:flex-col">

                <div className="flex flex-col w-[15rem] bg-gray-200 items-center rounded-xl p-3 m-2">

                    <h2 className="h4 px-4 text-center p-2 bg-gray-400 rounded-full">Filter By Categories</h2>
                    <div className="p-4 w-[15rem] mb-5">
                        {categories?.map(category => (
                            <div key={category._id} className="flex items-center ml-4 mb-2 ">
                                <input
                                    type="checkbox"
                                    id={`category-${category._id}`}
                                    onChange={(e) => handleCheck(e.target.checked, category._id)}
                                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded
                                        focus:ring-path-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800
                                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={`category-${category._id}`} className="ml-2 text-sm font-medium text-black">
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h2 className="h4 px-4 text-center p-2 bg-gray-400 rounded-full mb-2">Filter By Brands</h2>
                    <div className="p-4 w-[15rem] mb-8">
                        {uniqueBrands.map(brand => (
                            <div key={brand} className="flex items-center ml-4 mb-2">
                                <input
                                    type="radio"
                                    id={`brand-${brand}`}
                                    name="brand"
                                    onChange={() => handleBrandClick(brand)}
                                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded
                                        focus:ring-path-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800
                                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-medium text-black">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h2 className="h4 px-4 text-center p-2 bg-gray-400 rounded-full mb-1">Filter By Price</h2>
                    <div className="p-4 w-[15rem]">
                        <input
                            type="text"
                            placeholder="Enter Price"
                            value={priceFilter}
                            onChange={handlePriceFilter}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="p-4 pt-0">
                        <button
                            className="w-full px-4 py-2 bg-red-600 rounded-xl border my-4"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>

                </div>

                <br/>
                <br/>
                <br/>

                <div className="p-2">
                    <h2 className="text-2xl px-2 font-bold text-center mb-2">{products?.length} Products</h2>
                    <hr/>
                    <div className="flex flex-wrap items-center">
                        {products.length === 0 ? (<Loader/>) : (
                            products?.map((pro) => (
                                <div className="p-3" key={pro._id}>
                                    <ProductCart product={pro}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Shop;
