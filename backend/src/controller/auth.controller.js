import logger from '../config/logger.js'
import { authService } from '../services/index.js'
import catchAsync from '../utils/catchAsync.js'

export const signin = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const result = await authService.signInWithEmailAndPassword(email, password)
})