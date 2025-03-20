import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

// Async method that connect to mongodb atlas
const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connection success! ${connectInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1)
    }
}

export default connectDB