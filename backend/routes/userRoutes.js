import { Router } from "express";
import { addMovie, loginUser, logoutUser, profileImage, refresh, register, removeMovie, userProfile, watchlist } from "../controller/userController.js";
import {userAuth} from "../middleware/authMiddleware.js";

const router = Router()

router.post('/login', loginUser)

router.post('/register', register)

router.get('/refresh',refresh)

router.get('/profile',userAuth, userProfile)

router.post('/profile/addImage',userAuth, profileImage)

router.get('/watchlist',userAuth, watchlist)

router.post('/addMovie',userAuth, addMovie)

router.delete('/removeMovies',userAuth, removeMovie)

router.post('/logout', logoutUser)

export default router