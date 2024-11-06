import config from '../config/config.js'
import { authService, emailService, tokenService, userService } from '../services/index.js'
import catchAsync from '../utils/catchAsync.js'
import httpStatus from 'http-status'

export const signin = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const { user } = await authService.signInWithEmailAndPassword(email, password)
    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(user)
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: config.server.NODE_ENV === 'production',
        sameSite: config.server.NODE_ENV === 'production' ? 'None' : '',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({ accessToken })
})

export const signup = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    const verifyEmailToken = tokenService.generateEmailVerifyToken(user)
    await emailService.sendVerificationEmail(user.email, verifyEmailToken)
    return res.status(httpStatus.CREATED).json({ message: 'Please verify your email by clicking link sent to your given email' })
})