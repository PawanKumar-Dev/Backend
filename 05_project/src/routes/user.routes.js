import { Router } from 'express'
import { logoutUser, registerUser, loginUser } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middlerware.js'
import verifyJWT from '../middlewares/auth.middleware.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

// Route for User Login
router.route("/login").post(upload.none(), loginUser)


// Route for User Logout
router.route("/logout").post(verifyJWT, logoutUser)


// Function as endpoint where frontend may hit the server to refresh their Access Token via Refersh Token they have.
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request | Wrong Refresh Token")
    }

    await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
})


export default router