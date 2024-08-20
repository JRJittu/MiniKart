import express from "express";
const router = express.Router()
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { 
    createCategory,
    updateCategory,
    removeCategory,
    listCategories,
    readCategory,
 } from "../controllers/categoryController.js";

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:catId')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, removeCategory)

router.route('/categorylist').get(listCategories)
router.route('/:catId').get(readCategory)

export default router;