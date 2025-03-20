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


// Express use built-in JSON parser middleware
// Automatically parses incoming requests with JSON payloads(data)
// Parsed data available on "req.body"
app.use(express.json({ limit: "16kb" }))


// Express parse incoming the requests that are URL-encoded
// "URL-encoded" is format for data submitted via HTML forms
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


// Express serve static files from the "public" folder.
app.use(express.static("public"))


// Importing Routes
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)


export default app