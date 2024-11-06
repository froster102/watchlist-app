import { User } from "../model/index.js"
import ApiError from "../utils/ApiError.js"
import httpStatus from 'http-status'

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>} 
 */
export const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

/**
 * 
 * @param {Object} userBody 
 * @returns {Promise<User>}
 */
export const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    return User.create(userBody)
}
