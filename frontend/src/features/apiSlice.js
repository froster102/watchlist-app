import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from './authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/auth/refresh')
        console.log(refreshResult)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryReauth,
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        })
    })
})

export const { useLogoutMutation } = apiSlice