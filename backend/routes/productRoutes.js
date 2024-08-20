import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import { 
    addProduct,
    updateProduct,
    removeProduct,
    getProductByKey,
    fetchProductById,
    fetchAllProducts,
    addProductReviews,
    getopProducts,
    getNewProduct,
    filterProducts
} from "../controllers/productController.js";

const router = express.Router()

router.route('/')
    .get(getProductByKey)
    .post(authenticate, authorizeAdmin, formidable(), addProduct)

router.route('/allproducts').get(fetchAllProducts)
router.get('/top', getopProducts)
router.get('/new', getNewProduct)

router.route('/:id')
    .put(authenticate, authorizeAdmin, formidable(), updateProduct)
    .delete(authenticate, authorizeAdmin, removeProduct)
    .get(fetchProductById)

router.route('/:id/reviews').post(authenticate, checkId, addProductReviews)

router.route('/filtered-products').post(filterProducts)

export default router