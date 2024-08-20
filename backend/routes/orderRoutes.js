import express from "express";
import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"
import { 
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTOtalSales,
    calTotalSalesPerDate,
    orderById,
    markOrderAsPaid,
    markOrderAsDelivered,
 } from "../controllers/orderController.js";

const router = express.Router()

router.route('/')
    .post(authenticate, createOrder)
    .get(authenticate, authorizeAdmin, getAllOrders)

router.route('/mine').get(authenticate, getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTOtalSales)
router.route('/total-sales-per-date').get(calTotalSalesPerDate)
router.route('/:id').get(authenticate, orderById)
router.route('/:id/pay').put(authenticate, markOrderAsPaid)
router.route('/:id/deliver').put(authenticate, authorizeAdmin, markOrderAsDelivered)


export default router
