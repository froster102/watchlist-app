import { Router } from "express";
import { adminLogin, deleteUser, editUser, usersList } from "../controller/adminController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = Router()

router.post('/login', adminLogin)
router.get('/',adminAuth, usersList)
router.delete('/deleteUser',adminAuth, deleteUser)
router.patch('/editUser',adminAuth, editUser)

export default router