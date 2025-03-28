import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Main Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Async function to upload local files to Cloudinary
const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // After successful upload, files are unlinked synchronously
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {

        // Unlink our temp file if uploading to Cloudinary fails, synchronously
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default uploadToCloudinary