import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import {
    useFetchAllCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice"
import CategoryForm from "../../components/categoryForm"
import CatModel from "../../components/catModel"
import AdminMenu from "./adminMenu"



const CategoryList = () => {
    const {data: categories, refetch} = useFetchAllCategoryQuery();

    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async (e) => {
        e.preventDefault()
        if(!name){
            toast.error("Category Name is required")
            return
        }

        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error)
            }
            else{
                setName("")
                refetch()
                toast.success(`${result.name ? result.name : "Category"} is created`);
            }
        } catch (error) {
            toast.error("Createing category is failed..! Try Again")
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()
        if(!updatingName){
            toast.error("Category Name is required")
            return;
        }

        try {
            const result = await updateCategory({catId:selectedCategory._id, updateCat:{name: updatingName}}).unwrap()
            if(result.error){
                toast.error(result.error)
            }
            else{
                setUpdatingName("")
                setSelectedCategory("")
                setModalVisible(false)
                refetch()
                toast.success(`${result.name ? result.name : "Category"} is updated`);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const handleDeleteCategory = async (e) => {
        e.preventDefault()
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            }
            else{
                setUpdatingName("")
                setSelectedCategory("")
                setModalVisible(false)
                refetch()
                toast.success(`${result.name ? result.name : "Category"} is deleted`);
            }

        } catch (error) {
            toast.error("Failed to delete Category. Try again...!")
        }
    }

    return (
        <div className="ml-[4rem] flex flex-col md:flex-row">
            <AdminMenu />
            
            <div className="md:w-3/4 p-3">
                <div className="h-12 text-red-500 font-semibold text-3xl flex justify-center m-4">Manage Categories</div>

                <CategoryForm 
                    value={name} 
                    setValue={setName} 
                    handleSubmit={handleCreateCategory} 
                />
                <br/>
                <hr/>
                <br/>

                <div className="flex flex-wrap">
                    {categories?.map(catName => (
                        <div key={catName._id}>
                            <button className="bg-white text-black border border-red-500 
                                py-2 px-4 rounded-lg m-3 hover:bg-red-300 
                                focus:outline-none focus:ring-2 focus:red-700 focus:opacity-50" 
                                onClick={() => {
                                    setModalVisible(true) 
                                    setSelectedCategory(catName) 
                                    setUpdatingName(catName.name)
                                }}>{catName.name}</button>
                        </div>
                    ))}
                </div>

                <CatModel isOpen={modalVisible} onClose={()=>setModalVisible(false)}>
                    <CategoryForm 
                        value={updatingName} 
                        setValue={value => setUpdatingName(value)} 
                        handleSubmit={handleUpdateCategory}
                        buttonTxt="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </CatModel>

            </div>
        </div>
    )
}

export default CategoryList