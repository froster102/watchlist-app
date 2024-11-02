import express from 'express'
import { authController } from '../controller/index.js'

const router = express.Router()

router.post('/signin',authController.signin)

export default router