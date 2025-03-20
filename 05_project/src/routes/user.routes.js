import { Router } from 'express'
import { registerUser, loginUser, logoutUser, refreshAccessToken } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middlerware.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

// User Register Route
// "upload.fields" is middleware from multer allowing us to pass images or multi-part data
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

// User Login Route
// "upload.none()" from multer middleware allow us to send data in form method and json as well
router.route("/login").post(upload.none(), loginUser)


// Secured Routes
// Logout Route which use verifyJWT middleware
router.route("/logout").post(verifyJWT, logoutUser)


// Route to hit when refreshing Access Token
router.route("/refreshtoken").post(refreshAccessToken)


export default router