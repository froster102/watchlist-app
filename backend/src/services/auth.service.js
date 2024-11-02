import ApiError from '../utils/ApiError.js'
import User from "../model/user.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/utils.js"
import httpStatus from 'http-status'

/** 
 * Sign in with email and password
 *@param {string} email
 *@param {string} password 
*/
export const signInWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user || (!user.comparePasswords(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
    // const accessToken = generateAccessToken(user._id, 'user')
    // const refreshToken = generateRefreshToken(user._id, 'user')
    // return {
    //     accessToken,
    //     refreshToken,
    //     user
    // }
}

/**
 * Sign up a user 
 * @param {string} email 
 * @param {password} password 
 */
export const signup = async (email, password) => {
    const user = User.findOne({ email })
    if (user) throw new Error('User with email already exists')

}
