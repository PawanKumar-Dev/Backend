import mongoose from 'mongoose'

const orderItemsSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    costumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema)