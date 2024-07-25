import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { token: null, role: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, role } = action.payload
            state.token = accessToken
            state.role = role
            localStorage.setItem('userInfo', JSON.stringify({ token: accessToken, role }))
        },
        logout: (state, action) => {
            state.token = null
            state.role = null
            localStorage.removeItem('userInfo')
        }
    },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRole = (state) => state.auth.role
