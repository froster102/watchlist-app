import mongoose from 'mongoose'
import User from '../model/User.js'
import brcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/utils.js'
import jwt from 'jsonwebtoken'


mongoose.connect('mongodb://localhost:27017')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        if (user.role !== 'admin') {
            console.log(user)
            try {
                const check = await brcrypt.compare(password, user.password)
                if (check) {
                    const accessToken = generateAccessToken(user._id, user.role)
                    const refreshToken = generateRefreshToken(user._id, user.role)
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'None',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
                    res.status(200).json({ token: accessToken ,userId:user._id,role:user.role},)
                }
                else {
                    res.status(401).json({ message: 'Bad Credentials' })
                }
            } catch (e) {
                console.log(e.message)
            }
        } else {
            res.status(401).json({ message: 'Bad Credentials' })
        }
    } else {
        res.status(401).json({ message: 'Bad Credentials' })
    }
}

const refresh = (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.status(401).json({ message: 'unauthorised no token' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'invalid token' })
        }
        const accessToken = generateAccessToken(decoded.userId, decoded.role)
        res.json({ accessToken })
    })
}

const register = async (req, res) => {
    const { email, password } = req.body
    const hash = await brcrypt.hash(password, 10)
    try {
        const user = await User.create({
            email: email,
            password: hash,
            role: 'user'

        })
        res.status(200).json({ message: 'User registerd' })
    } catch (e) {
        console.log(e.message)
        res.status(409).json({ message: 'user already exists!' })
    }
}

const userProfile = (req, res) => {
    res.status(200).json({ message: 'user profile' })
}

const profileImage = (req, res) => {
    res.status(200).json({ message: 'image added' })
}

const watchlist = (req, res) => {
    res.status(200).json({ movies: [] })
}

const addMovie = (req, res) => {
    res.status(200).json({ message: 'add to watchlist' })
}

const removeMovie = (req, res) => {
    res.status(200).json({ message: 'removed suceess' })
}

const logoutUser = (req, res) => {
    const cookies = req.cookies
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: false })
    res.status(200).json({ message: 'logged out' })
}

export {
    loginUser,
    register,
    refresh,
    userProfile,
    profileImage,
    watchlist,
    addMovie,
    removeMovie,
    logoutUser
}