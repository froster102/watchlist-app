import { Router } from "express";
import { addMovie, loginUser, addProfileImage, register, removeMovie, userProfile, watchlist } from "../controller/userController.js";
import { userAuth } from "../middleware/authMiddleware.js";
import multer from 'multer'


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024
    },
})

const router = Router()

router.post('/login', loginUser)

router.post('/register', register)

router.get('/profile', userAuth, userProfile)

router.post('/profile/addImage', userAuth, upload.single('file'), addProfileImage)

router.get('/watchlist', userAuth, watchlist)

router.post('/addMovie', userAuth, addMovie)

router.delete('/removeMovies', userAuth, removeMovie)


export default router