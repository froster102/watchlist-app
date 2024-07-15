import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const authenticateUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', {
            email: email,
            password: password
        })
        return response.data
    } catch (e) {
        throw error.response.data
    }
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userData = await authenticateUser(email, password);
            return userData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        role: null,
        token: null
    },
    reducers: {
        logout: (state, action) => {
            state.userId = null,
                state.role = null,
                state.token = null
        }
    },
    // extraReducers 
})

export const { logout } = authSlice.actions
export default authSlice.reducer
