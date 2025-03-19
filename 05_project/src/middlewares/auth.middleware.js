import ApiError from "../utils/ApiError"
import asyncHandler from "../utils/asyncHandler"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.models"

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unotherzied Request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }
})

export default verifyJWT