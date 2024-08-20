import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema

const reviewSchema = mongoose.Schema({
    user_name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })


const productSchema = mongoose.Schema({
    pName: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true},
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },

    reviews: [ reviewSchema ],
    net_rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },

}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product