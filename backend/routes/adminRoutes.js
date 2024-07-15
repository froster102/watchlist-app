import { Router } from "express";
import { adminLogin, deleteUser, editUser, logoutUser, refresh, usersList } from "../controller/adminController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = Router()

router.post('/login', adminLogin)
router.get('/',userAuth, usersList)
router.delete('/deleteUser',userAuth, deleteUser)
router.patch('/editUser',userAuth, editUser)
router.get('/refresh', refresh)
router.post('/logout', logoutUser)

export default router