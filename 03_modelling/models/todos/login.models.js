import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
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
}, { timestamps: true })

export const Login = mongoose.model("Login", loginSchema)