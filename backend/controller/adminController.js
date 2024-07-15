import mongoose from "mongoose"
import User from "../model/User.js"
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../utils/utils.js"


mongoose.connect('mongodb://localhost:27017')

const adminLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        const check = await bcrypt.compare(password, user.password)
        if (user.role === 'admin' && check) {
            const accessToken = generateAccessToken(user._id, user.role)
            const refreshToken = generateRefreshToken(user._id, user.role)
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({ accessToken })
        }

        else {
            res.status(401).json({ message: 'Bad Credentials' })
        }
    }
    else {
        res.status(401).json({ message: 'Bad Credentials' })
    }
}

const usersList = async (req, res) => {
    let users = await User.find()
    users = users.filter((user) => (user.role !== 'admin'))
    console.log(users)
    res.status(200).json({
        users: users
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    try {
        const user = await User.findById(id)
        if (user) {
            console.log(user)
            const response = await User.deleteOne({ email: user.email })
            if (response.deletedCount > 0) {
                res.status(200).json({ message: 'User deleted sucessfully' })
            }
            else {
                res.status(404).json({ message: 'User not found!' })
            }
        } else {
            res.status(404).json({ message: 'User not found!' })
        }
    } catch (e) {
        console.log(e.message)
        res.status(404).json({ message: 'User not found!' })
    }
}

const editUser = async (req, res) => {
    const { id, email } = req.body
    try {
        const user = await User.findByIdAndUpdate(id, { email: email })
        if (user) {
            res.status(200).json({ message: 'User updated sucessfully' })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (e) {
        console.log(e.message)
    }
}



const logoutUser = (req, res) => {
    const cookies = req.cookies
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: false })
    res.status(200).json({ message: 'logged out' })
}

export {
    adminLogin,
    usersList,
    deleteUser,
    editUser,
    refresh,
    logoutUser
}