import asyncHandler from "../utils/asyncHandler.js"

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
})

export default registerUser