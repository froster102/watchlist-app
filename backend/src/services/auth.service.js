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

