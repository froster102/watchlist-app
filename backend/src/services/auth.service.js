import ApiError from '../utils/ApiError.js'
import { User } from "../model/index.js"
import httpStatus from 'http-status'
import { userService } from './index.js'

/** 
 * Sign in with email and password
 *@param {string} email
 *@param {string} password 
*/
export const signInWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user || (!user.comparePasswords(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
    return {
        user
    }
}

export const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyTokenDoc = await tokenService.verfiyToken(token, tokenTypes.VERIFY_EMAIL)
        const user = await userService.getUserById(verifyTokenDoc.user)
        if (!user) {
            throw new Error()
        }
        await userService.updateUserById(user._id, { verficationStatus: true })
        await Token.deleteMany({ user: user._id, type: tokenTypes.VERIFY_EMAIL })
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed')
    }
}

