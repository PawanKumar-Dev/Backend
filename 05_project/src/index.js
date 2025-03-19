import 'dotenv/config'
import app from './app.js'
import connectDB from "./db/index.js";
const port = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening to Port: ${port}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed!!!", error)
    })