import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import {apiSlice} from '../features/apiSlice.js'

const store = configureStore({
    reducer: {
        auth : authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})



export default store