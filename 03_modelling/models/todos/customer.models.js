import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, "Password length should 6 minimum"]
    }
})

export const Customer = mongoose.model("Customer", customerSchema)