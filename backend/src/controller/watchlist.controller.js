import { authService } from '../services/index.js'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const { user, accessToken, refreshToken } = await authService.signin(email, password)
        console.log(result)
        return res.status(201).json({ user, accessToken, refreshToken })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


const register = async (req, res) => {

}

const getWatchlist = (req, res) => {

}

const addToWatchlist = (req, res) => {

}

const removeFromWatchlist = (req, res) => {

}

export {
    register,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
}