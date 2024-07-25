import User from "../model/User.js"
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../utils/utils.js"

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
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({ accessToken, role: user.role })
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
    let users = await User.find({}, { _id: 1, email: 1, role: 1 })
    users = users.filter((user) => (user.role !== 'admin'))
    res.status(200).json({
        users: users
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    try {
        if (id) {
            const response = await User.findByIdAndDelete(id)
            if (response) {
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
    const { userId, userEmail } = req.body
    console.log(userId, userEmail)
    try {
        const user = await User.findByIdAndUpdate(userId, { email: userEmail })
        if (user) {
            res.status(200).json({ message: 'User updated sucessfully' })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (e) {
        console.log(e.message)
    }
}


export {
    adminLogin,
    usersList,
    deleteUser,
    editUser,
}