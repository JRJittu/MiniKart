import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.json({error: "Name is required"})
        }

        const existCategory = await Category.findOne({name})

        if(existCategory){
            return res.json({error: "Name already Exist"});
        }

        const category1 = await new Category({name}).save()
        return res.json(category1)

    } catch (error) {
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { catId } = req.params;

        const category1 = await Category.findOne({_id: catId})

        if(!category1){
            return res.status(404).json({error: "Category not found..!"})
        }

        category1.name = name
        const updatedCat = await category1.save()
        return res.json(updatedCat)

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"})
    }
})

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.catId)
        if(removed) {
            res.json(removed)
        }else{
            res.status(404).json({error: "Category Not Found"})
        }
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"})
    }
})

const listCategories = asyncHandler(async (req, res)=>{
    try {
        const allCat = await Category.find({})
        return res.json(allCat)
    } catch (error) {
        return res.status(400).json(error.message)
    }

})

const readCategory = asyncHandler(async (req, res)=>{
    try {
        const cat1 = await Category.findOne({_id:req.params.catId})
        if(cat1){
            return res.json(cat1)
        }
        else{
            return res.status(404).json({error:"Category Not Found"})
        }
    } catch (error) {
        return res.status(404).json({error:"Category Not Found"})
    }
})

export {
    createCategory, 
    updateCategory, 
    removeCategory,
    listCategories,
    readCategory,
}