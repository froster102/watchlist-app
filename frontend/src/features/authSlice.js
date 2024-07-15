import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        role: null,
        token: null
    },
    reducers: {
        setCredentials:(state,action)=>{
            const {userId,token,role} = action.payload
            state.userId = userId,
            state.token = token,
            state.role = role
        },
        logout: (state, action) => {
            state.userId = null,
                state.role = null,
                state.token = null
        }
    },
})

export const { logout,setCredentials } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.userId
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserRole = (state) =>state.auth.role