import axios from "axios";

const BASE_URL = 'http://localhost:4000/v1/api'
const axiosInstanse = axios.create({ baseURL: BASE_URL })

export const signIn = async ({ email, password }) => {
    return await axiosInstanse.post('/auth/signin', { email, password })
}

export const signUp = async ({ email, password }) => {
    return await axiosInstanse.post('/auth/signup', { email, password })
}

export const verifyEmail = async (token) => {
    return await axiosInstanse.post('/auth/verify-token', { token })
}