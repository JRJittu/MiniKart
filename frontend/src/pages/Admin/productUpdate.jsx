import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./adminMenu";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadImageMutation,
} from "../../redux/api/productApiSlice";

const ProductUpdate = () => {
    const params = useParams();
    const { data: productData, refetch} = useGetProductByIdQuery(params._id);
    
    const [image, setImage] = useState(productData?.image || "");
    const [pName, setpName] = useState(productData?.pName || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");

    const navigate = useNavigate();

    const { data: categories = [] } = useFetchAllCategoryQuery();

    const [uploadProductImage] = useUploadImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setpName(productData.pName);
            setDescription(productData.description);
            setPrice(productData.price);
            setImage(productData.image);
            setBrand(productData.brand);
            setStock(productData.countInStock);
            setQuantity(productData.quantity);
            setCategory(productData.category);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', image)
            formData.append('pName', pName)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('countInStock', stock)

            const { data } = await updateProduct({ pId: params._id, formData });

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(`${data.pName} is successfully updated`);
                refetch()
                navigate("/admin/allproductslist");
            }

        } catch (error) {
            toast.error("Product update failed, try again");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product");

            if (!answer) return;

            const { data } = await deleteProduct(params._id);
            toast.success(`${data.pName} is deleted successfully`);
            navigate("/admin/allproductslist");
        } catch (error) {
            toast.error("Product delete failed, try again later");
        }
    };

    return (
        <div className="container xl:mx-[10rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="w-full p-3">
                    <div className="text-center w-3/4 font-bold text-2xl text-red-500 mb-4">Update Product</div>
                    <hr />

                    <div className="my-4 text-center w-3/4">
                        {image && (
                            <div className="">
                                <img src={image} alt="Product" className="block mx-auto max-h-[200px]" />
                            </div>
                        )}

                        <label className="text-pink-500 pl-20 block rounded-lg cursor-pointer font-bold py-5">
                            {image ? image.name : "Upload Image "}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : "text-black"}
                            />
                        </label>
                    </div>
                    <hr />

                    <div className="py-3">
                        <div className="flex flex-wrap">
                            <div className="one ml-10">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text"
                                    value={pName}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setpName(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name">Price</label> <br />
                                <input
                                    type="number"
                                    value={price}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="one ml-10">
                                <label htmlFor="quantity">Quantity</label> <br />
                                <input
                                    type="number"
                                    value={quantity}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="brand">Brand</label> <br />
                                <input
                                    type="text"
                                    value={brand}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="description" className="my-5 ml-10">Description</label> <br />
                        <textarea
                            type="text"
                            value={description}
                            placeholder="Enter Description about product"
                            className="p-2 mb-3 ml-10 bg-gray-100 border rounded-lg w-[77%] text-black"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex flex-wrap">
                            <div className="one ml-10">
                                <label htmlFor="stock">Count in Stock</label> <br />
                                <input
                                    type="text"
                                    value={stock}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="category">Category</label> <br />
                                <select
                                    value={category}
                                    placeholder="Choose Category"
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories?.map((cat) => (
                                        <option key={cat._id} value={cat._id}> {cat.name} </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex">
                            <button
                                onClick={handleUpdate}
                                className="ml-10 mt-7 py-4 px-6 border rounded-lg bg-green-500 font-semibold hover:bg-green-700">
                                Update
                            </button>

                            <button
                                onClick={handleDelete}
                                className="ml-10 mt-7 py-4 px-6 border rounded-lg bg-red-500 font-semibold hover:bg-red-700">
                                Delete
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductUpdate;
