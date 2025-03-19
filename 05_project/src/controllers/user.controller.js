import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadToCloudinary from "../utils/cloudinary.js"
import ApiRespnse from "../utils/ApiResponse.js"

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

    if ([username, email, fullname, password].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    const existedUser = await User.findOne({
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

    const avatar = await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required!")
    }

    const user = await User.create({
        email,
        fullname,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Registering User went wrong somewhere!")
    }

    return res.status(201).json(
        new ApiRespnse(200, createdUser, "User created successfully!")
    )
})

export default registerUser