import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

// Utility function

function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10
    const taxRate = 0.15
    const taxPrice = (itemsPrice * taxRate).toFixed(2)

    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2)

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice
    }
}

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body

        if (orderItems.length === 0) {
            res.status(400)
            throw new Error("No items to orders");
        }

        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) }
        })

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            )

            if (!matchingItemFromDB) {
                res.status(404)
                throw new Error(`Product Not found ${itemFromClient._id}`)
            }

            return {
                ...itemFromClient,
                name: matchingItemFromDB.pName,
                image: matchingItemFromDB.image,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined
            }

        })

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrices(dbOrderItems)

        const new_order = new Order({
            orderItems: dbOrderItems,
            userId: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await new_order.save()
        res.status(201).json(createdOrder)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', "id username")
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const getUserOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const countTotalOrders = asyncHandler(async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        res.json({ totalOrders: totalOrders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const calculateTOtalSales = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({})
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)
        res.json({ totalSales: totalSales })

    } catch (error) {
        res.status({ error: error.message })
    }
})

const calTotalSalesPerDate = asyncHandler(async (req, res) => {
    try {
        const salesByDate = await Order.aggregate([
            {
                $match: { isPaid: true }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$paidAt' }
                    },
                    totalSales: {
                        $sum: '$totalPrice'
                    }
                }
            }
        ]);

        res.json(salesByDate);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const orderById = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'username email')
        if (order) {
            res.json(order)
            
        } else {
            res.status(404)
            throw new Error("Order not found")
        }

    } catch (error) {
        res.status({ error: error.message })
    }
})

const markOrderAsPaid = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                updateTime: req.body.updateTime,
                emailAddr: req.body.emailAddr
            }
        } else {
            res.status(404)
            throw new Error("Order not found")
        }

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)

    } catch (error) {
        res.status({ error: error.message })
    }
})

const markOrderAsDelivered = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isDelivered = true,
                order.deliveredAt = Date.now()

            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder)
            
        } else {
            res.status(404)
            throw new Error("Order not found")
        }

    } catch (error) {
        res.status({ error: error.message })
    }
})

// const calculateTOtalSales = asyncHandler(async (req, res) => {
//     try {

//     } catch (error) {
//         res.status({error: error.message})
//     }
// })


export {
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTOtalSales,
    calTotalSalesPerDate,
    orderById,
    markOrderAsPaid,
    markOrderAsDelivered,
}