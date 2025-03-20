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

// 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// Importing Routes
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)


export default app