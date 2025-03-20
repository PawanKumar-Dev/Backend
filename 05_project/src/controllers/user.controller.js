import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadToCloudinary from "../utils/cloudinary.js"
import ApiRespnse from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'


// Methods that generate Access/Refresh Tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong when generating Access and Refresh Token")
    }
}


// Register Methods
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

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!")
    }

    // Below throws becoz req.files is not existing sometimes
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
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


// Login Function
const loginUser = asyncHandler(async (req, res) => {
    // Get userlogin input from Frontend
    // If user doesn't exist, then throw error
    // If user exist
    // Validate login with password matching
    // Then provide access/refresh tokens
    // Send cookies

    const { email, username, password } = req.body

    if (!(username || email)) {
        throw new ApiError(400, "Username or Email is required!")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "This user doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Your password is wrong || Try agin")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiRespnse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User Logged in Successfully"
        ))
})


// Logout Function
const logoutUser = asyncHandler(async (req, res) => {
    // Get User data via request id
    // Then set refreshToken to undefined
    // Also clear cookies

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiRespnse(200, {}, "User Loggged Out!"))
})



// Method to provide an endpoint for Frontend where "Refresh Token" is sent.
// Then new "Access Token" is provided once verified
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request || Wrong Refresh Token")
    }

    const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)

    if (!user) {
        throw new ApiError(401, "Wrong User || User does not exist")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token expired || Login Again")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { newAccessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

    return res.status(200)
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiRespnse(
                200,
                {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                },
                "Access Token Refreshed!"
            )
        )
})



//
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }
})


export { registerUser, loginUser, logoutUser, refreshAccessToken }