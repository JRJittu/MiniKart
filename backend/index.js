// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Utiles
import connectDB from './config/db.js'
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname+"/uploads")))

app.listen(port, () => console.log(`Server running on the port : ${port}`))






















/* 
app.use(express.json()): Parses incoming JSON requests and makes the payload available in req.body.
app.use(express.urlencoded({ extended: true })): Parses incoming URL-encoded form submissions and makes the payload available in req.body.
app.use(cookieParser()): Parses cookies from the request header and makes them available in req.cookies
*/