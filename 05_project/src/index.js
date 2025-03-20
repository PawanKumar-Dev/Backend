import 'dotenv/config'
import app from './app.js'
import connectDB from "./db/index.js";
const port = process.env.PORT || 8000

// "dotenv/config" package must be imported first
// So we can access our .env variables throughout our App.


// Imported DB connection
// Then started listening at the port

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening to Port: ${port}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed!!!", error)
    })