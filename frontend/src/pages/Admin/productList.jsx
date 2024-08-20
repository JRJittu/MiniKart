import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    useCreateProductMutation,
    useUploadImageMutation,
} from '../../redux/api/productApiSlice'

import { useFetchAllCategoryQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./adminMenu"

const ProductList = () => {
    const [image, setImage] = useState('')
    const [pName, setpName] = useState('')
    const [price, setprice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)

    const navigate = useNavigate()

    const [uploadProductImage] = useUploadImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories, refetch } = useFetchAllCategoryQuery()

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)

        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('image', image)
            productData.append('pName', pName)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('brand', brand)
            productData.append('countInStock', stock)

            const { data } = await createProduct(productData)
            if (data.error) {
                toast.error(data.error)
            }
            else {
                toast.success(`${data.pName} is created`)
                navigate("/admin/allproductslist");
            }

        } catch (error) {
            toast.error("Create Product failed, try again")
        }
    }

    return (
        <div className="container xl:mx-[10rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="w-full p-3">

                    <div className="flex justify-center h-12 font-bold text-4xl text-red-500 ">Create Product</div>

                    <div className="mb-3">
                        {imageUrl ? 
                        (
                            <div className="text-center">
                                <img src={imageUrl} alt="Product" className="block mx-auto max-h-[200px]" />
                            </div>
                        ) 
                        :
                        (
                            <label className="text-pink-500 block text-center rounded-lg cursor-pointer font-bold py-11 border">
                                {image ? image.name : "Upload Image "}
                                <input
                                    type="file" name="image" accept="image/*"
                                    onChange={uploadFileHandler}
                                    className={!image ? 'hidden' : 'text-black'}
                                />
                            </label>
                        )}
                    </div>

                    <div className="py-3">

                        <div className="flex flex-wrap ">
                            <div className="one ml-10 ">
                                <label htmlFor="name">Name</label> <br />
                                <input
                                    type="text" value={pName}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setpName(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10 ">
                                <label htmlFor="name block">Price</label> <br />
                                <input
                                    type="number" value={price}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setprice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap ">
                            <div className="one ml-10 ">
                                <label htmlFor="name block">Quantity</label> <br />
                                <input
                                    type="number" value={quantity}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10 ">
                                <label htmlFor="name block">Brand</label> <br />
                                <input
                                    type="text" value={brand}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5 ml-10">Description</label> <br/>
                        <textarea
                            type="text" value={description} placeholder="Enter Description about product"
                            className="p-2 mb-3 ml-10 bg-gray-100 border rounded-lg w-[77%] text-black"
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex flex-wrap ">
                            <div className="one ml-10 ">
                                <label htmlFor="name block">Count in Stock</label> <br />
                                <input
                                    type="text" value={stock}
                                    className="p-4 mb-3 w-[35rem] border rounded-lg bg-gray-100 text-black"
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10 ">
                                <label htmlFor="">Category</label> <br />
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

                        <button
                            onClick={handleSubmit}
                            className="ml-10 mt-7 py-4 px-6 border rounded-lg bg-pink-500 font-semibold hover:bg-pink-700">
                            Submit</button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductList