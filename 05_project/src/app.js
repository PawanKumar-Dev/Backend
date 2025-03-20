import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// cookieParser package allow us to access/modify cookies in express.js
app.use(cookieParser())


// Explicit declartion that json format is valid/accepted by our server
app.use(express.json({ limit: "16kb" }))


// Declartion to parse incoming request that are URL-encoded
// Which is format for data submitted via HTML forms
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


// Declare our static asset folder
app.use(express.static("public"))


// Importing Routes
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)


export default app