import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { pName, description, price, quantity, category, brand, image, countInStock } = req.fields;
        switch (true) {
            case !pName:
                return res.json({ error: "product name is required" })
            case !description:
                return res.json({ error: "description is required" })
            case !price:
                return res.json({ error: "price is required" })
            case !category:
                return res.json({ error: "category name is required" })
            case !quantity:
                return res.json({ error: "quantity is required" })
            case !brand:
                return res.json({ error: "brand name is required" })
            case !image:
                return res.json({ error: "image url is required" })
            case !countInStock:
                return res.json({ error: "countInStock is required" }) 
        }

        const product1 = new Product({ ...req.fields })
        await product1.save()
        res.status(201).json(product1)

    } catch (error) {
        res.status(400).json({error : error.message});
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { pName, description, price, quantity, category, brand, image, countInStock } = req.fields;
        switch (true) {
            case !pName:
                return res.json({ error: "product name is required" })
            case !description:
                return res.json({ error: "description is required" })
            case !price:
                return res.json({ error: "price is required" })
            case !category:
                return res.json({ error: "category name is required" })
            case !brand:
                return res.json({ error: "brand name is required" })
            case !image:
                return res.json({ error: "Image is required" })
            case !quantity:
                 return res.json({ error: "quantity is required" })             
            case !countInStock:
                return res.json({ error: "countInStock is required" }) 
        }

        const product1 = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });
        res.json(product1);

    } catch (error) {
        res.status(400).json(error.message)
    }
})

const removeProduct = asyncHandler( async (req, res) => {
    try {
        const product1 = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product1)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

const getProductByKey = asyncHandler( async(req, res) => {
    try {
        const pageSize = 6
        console.log("Query : ",req.query)
        const keyword = req.query.keyword ?
            { pName: {$regex: req.query.keyword, $options: "i"} } : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)

        res.json({
            products, 
            page: 1, 
            pages: Math.ceil(count/pageSize), 
            hasMore: false
        })

    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

const fetchProductById = asyncHandler(async (req, res)=>{
    try {
        const product1 = await Product.findById(req.params.id)
        if(product1){
            return res.json(product1)
        }
        else{
            res.status(404)
            throw new Error("Product Not Found");
        }

    } catch (error) {
    }
})

const fetchAllProducts = asyncHandler(async (req, res)=>{
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1})
        // Populates : it adds the details of ObjectId present in category feild, 
        // means gets details from category collection and add to products
        res.json(products)

    } catch (error) {
        res.status(500).json({error: "Server Error"})
    }
})

const addProductReviews = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product1 = await Product.findById(req.params.id);

        if (product1) {
            const alreadyReviewed = product1.reviews.find(r => r.user.toString() === req.user._id.toString());
            
            if (alreadyReviewed) {
                return res.status(400).json({ message: "Product already reviewed" });
            }

            const review1 = {
                user_name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            };

            product1.reviews.push(review1);
            product1.numReviews = product1.reviews.length;

            product1.net_rating = product1.reviews.reduce((acc, item) => item.rating + acc, 0) / product1.reviews.length;

            await product1.save();
            res.status(201).json({ message: "Review is added" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getopProducts = asyncHandler(async(req, res)=>{
    try {
        const products = await Product.find({}).sort({net_rating: -1}).limit(4)
        res.json(products)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const getNewProduct = asyncHandler(async(req, res)=>{
    try {
        const products = await Product.find({}).sort({_id: -1}).limit()
        res.json(products)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const filterProducts = asyncHandler(async (req, res) => {
    try {
        const { checked, radio } = req.body

        let args = {}
        
        if(checked.length > 0 ) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};

        const products = await Product.find(args)
        res.json(products)

    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
})


export {
    addProduct,
    updateProduct,
    removeProduct,
    getProductByKey,
    fetchProductById,
    fetchAllProducts,
    addProductReviews,
    getopProducts,
    getNewProduct,
    filterProducts,
}
