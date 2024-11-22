import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { addMinutes, getUnixTime } from 'date-fns'
import User from '../model/user.model.js'
import { Token } from '../model/index.js'
import tokenTypes from '../config/token.js'

/**
 * Generate token
 * @param {string} userId 
 * @param {Date} expires 
 * @param {string} type 
 * @param {string} secret 
 * @returns {string}
 */
export const generateToken = (userId, expires, type, secret = config.jwt.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: getUnixTime(new Date),
        exp: getUnixTime(expires),
        type
    }
    return jwt.sign(payload, secret)
}

/**
 * Save token to database
 * @param {string} token 
 * @param {string} userId 
 * @param {Date} expires 
 * @param {string} type 
 * @param {boolean} blacklist 
 * @returns 
 */
export const saveToken = async (token, userId, expires, type, blacklist = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires,
        type,
        blacklist
    })
    return tokenDoc
}

/**
 * Verify the token
 * @param {string} token 
 * @param {string} type 
 * @returns {Promise<Token>}
 */
export const verfiyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.JWT_SECRET)
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false })
    if (!tokenDoc) {
        throw new Error('Token not found')
    }
    return tokenDoc
}

/**
 * Generate access and refresh tokens
 * @param {User} user 
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (user) => {
    const accessTokenExpires = addMinutes(new Date(), config.jwt.ACCESS_TOKEN_EXPIRY)
    const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS)
    
    const refreshTokenExpires = addMinutes(new Date(),config.jwt.REFRESH_TOKEN_EXPIRY)
    const refreshToken = generateToken(user._id, refreshTokenExpires, tokenTypes.REFRESH)
    await saveToken(refreshToken, user._id, config.jwt.REFRESH_TOKEN_EXPIRY, tokenTypes.REFRESH)
    return {
        accessToken,
        refreshToken
    }
}

/**
 * Generate token to email verification
 * @param {User} user 
 * @returns {Promise<String>}
 */
export const generateEmailVerifyToken = async (user) => {
    const expires = new Date(Date.now() + 5 * 60 * 1000)
    const verifyEmailToken = generateToken(user._id, expires, tokenTypes.VERIFY_EMAIL)
    await saveToken(verifyEmailToken, user._id, expires, tokenTypes.VERIFY_EMAIL)
    return verifyEmailToken
}