import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        else if (decoded.role !== 'user') {
            return res.status(401).json({ message: 'Not Authorized' })
        }
        req.userId = decoded.userId
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
        else if (decoded.role !== 'admin') {
            return res.status(401).json({ message: 'Not Authorized' })
        }
        req.userId = decoded.userId
        next()
    })
}

const logout = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: false })
    res.status(200).json({ message: 'logged out' })
}

export {
    userAuth,
    adminAuth,
    logout
} 