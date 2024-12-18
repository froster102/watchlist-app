import jwt from 'jsonwebtoken'

const generateAccessToken = (userId, role) => {
    return jwt.sign({
        "userId": userId,
        "role": role
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10s'
    })
}

const generateRefreshToken = (userId, role) => {
    return jwt.sign({
        "userId": userId,
        "role": role
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    })
}

export {
    generateAccessToken,
    generateRefreshToken,
}