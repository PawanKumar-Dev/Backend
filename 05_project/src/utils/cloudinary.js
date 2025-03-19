import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

//Cloudinary Config
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

        console.log("Success file upload", response.url)
        return response

    } catch (error) {
        // Unlink our temp file if uploading to Cloudinary fails
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default uploadToCloudinary