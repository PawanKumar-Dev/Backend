import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadToCloudinary from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    // Validation - not empty
    // Check if user already exist (by username and email)
    // Check for images and avatar
    // Upload them to cloudinary (Verify avatar upload)

    // Create User object - create entry in DB
    // Remove password and refresh token field from response
    // Check for User creation
    // Return response

    const { username, email, fullname, password } = req.body
    console.log("Email :", email)

    if ([username, email, fullname, password].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with Email or Username already exist!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!")
    }
})

export default registerUser