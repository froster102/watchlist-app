import mongoose from 'mongoose'
import User from '../model/User.js'
import brcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/utils.js'
import { storage } from '../firebaseConfig.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


mongoose.connect('mongodb://localhost:27017')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        if (user.role !== 'admin') {
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
                    res.status(200).json({ accessToken, role: user.role })
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

const userProfile = async (req, res) => {
    const { email, imageUrl } = await User.findById(req.userId)
    res.status(200).json({ email: email, imageUrl: imageUrl })
}

const addProfileImage = async (req, res) => {
    const { originalname, buffer } = req.file
    try {
        const storageRef = ref(storage, 'images/' + originalname)
        const snapshot = await uploadBytes(storageRef, buffer)
        const imageUrl = await getDownloadURL(snapshot.ref)
        console.log(imageUrl)
        const response = await User.findByIdAndUpdate(req.userId, { imageUrl: imageUrl })
        console.log(response)
        res.status(200).json({ message: 'image added' })
    } catch (e) {
        console.log(e.message)
    }
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

export {
    loginUser,
    register,
    userProfile,
    addProfileImage,
    watchlist,
    addMovie,
    removeMovie,
}