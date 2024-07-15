const refresh = (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.status(401).json({ message: 'unauthorised no token' })
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(404).json({ message: 'invalid token' })
        }
        const accessToken = generateAccessToken(decoded.userId, decoded.role)
        res.json({ accessToken })
    })
}

export {refresh}