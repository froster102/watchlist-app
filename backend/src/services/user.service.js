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
 * Create a user
 * @param {Object} userBody 
 * @returns {Promise<User>}
 */
export const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        const existingUser = await getUserByEmail(userBody.email)
        if (!existingUser.verificationStatus) {
            return existingUser
        }
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    return User.create(userBody)
}

/**
 * Get the user by id
 * @param {string} userId 
 * @returns {Promise<User>}
 */
export const getUserById = async (userId) => {
    return User.findById(userId)
}

export const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    Object.assign(user, updateBody)
    await user.save()
    return user
}