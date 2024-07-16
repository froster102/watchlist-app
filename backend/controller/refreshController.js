const refresh = (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorised no token' })
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - token expired' })
        }
        const accessToken = generateAccessToken(decoded.userId, decoded.role)
        res.json({ accessToken })
    })
}

export {refresh}