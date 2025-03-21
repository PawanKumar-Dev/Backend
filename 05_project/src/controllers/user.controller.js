import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import uploadToCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"
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


/*
Pseodo Code:
    - Get user details from frontend
    - Validation - not empty
    - Check if user already exist (by username and email)
    - Check for images and avatar
    - Upload them to cloudinary (Verify avatar upload)

    - Create User object - create entry in DB
    - Remove password and refresh token field from response
    - Check for User creation
    - Return response
*/

// User Register Method
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullname, password } = req.body

    // 
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

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User created successfully!")
        )
})


/*
Pseodo Code:
    - Get userlogin input from Frontend
    - If user doesn't exist, then throw error
    - If user exist
    - Validate login with password matching
    - Then provide access/refresh tokens
    - Send cookies
*/

// Login Function
const loginUser = asyncHandler(async (req, res) => {

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
        .json(new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User Logged in Successfully"
        ))
})


/*
Pseodo Code:
    - Get User data via request id
    - Then set refreshToken to undefined
    - Also clear cookies
*/

// Logout Function
const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Loggged Out!"))
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
            new ApiResponse(
                200,
                {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                },
                "Access Token Refreshed!"
            )
        )
})



// Change Password after login
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confPassword } = req.body

    if (newPassword !== confPassword) {
        throw new ApiError(401, "Confirm Password did not match!")
    }

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password Updated Successfully"
            ))
})


// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {

    // Auth middleware make sure our current user data is avaliable.
    return res
        .status(200)
        .json(
            200,
            req.user,
            "Current user fetched successfully"
        )
})



// Update Current User Details
const updateAccountDetails = asyncHandler(async (req, res) => {

    // Using object destructuring to extract fullname, email
    // From req.body (which user sent from frontend to be updated) 
    const { fullname, email } = req.body

    // Validation whether both "fullname" and "email" are provided.
    if (!fullname || !email) {
        throw new ApiError(400, "All fields required")
    }

    // 
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email
            }
        },
        { new: true }
    ).select("-password")

    // Return response of Successful Update
    return res.status(200)
        .json(new ApiResponse(
            200,
            user,
            "Account details updated!"
        ))
})


// Update User Avatar
const updateUserAvatar = asyncHandler(async (req, res) => {

    // Getting local filepath from multer when avatar image is uploaded
    const avatarLocalPath = req.file?.path

    // For missing data, 400 (Bad Request) right error code.
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar File is missing!")
    }

    // Upload avatar file to Cloudinary if no error present
    const avatar = await uploadToCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(401, "Avatar File failed to be uploaded to Cloudinary!")
    }

    // req.user is provide by our auth middleware.
    // { new: true } ensures updated document is returned instead of original one.
    // .select("-password") ensures when returning document. It will not include password field.


    // Update new avatar url in MongoDb 
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { avatar: avatar.url }
        },
        { new: true })
        .select("-password")


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Avatar Updated Successfully!"
            ))
})



// Update User Cover Image
const updateUserCoverImage = asyncHandler(async (req, res) => {

    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is missing!")
    }

    const cover = await uploadToCloudinary(coverImageLocalPath)

    if (!cover.url) {
        throw new ApiError(401, "Cover Image failed to be uploaded to Cloudinary!")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { coverImage: cover.url }
        },
        { new: true })
        .select("-password")


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Cover Image Updated Successfully!"
            ))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
}