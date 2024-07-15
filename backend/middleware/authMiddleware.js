import jwt, { decode } from "jsonwebtoken"

const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    })
}

const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    })
}

export {
    userAuth,
    adminAuth,
} 