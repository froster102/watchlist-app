import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register : builder.mutation({
            query : (data)=>({
                url : 'user/register',
                method : 'POST',
                body : {...data}
            })
        })
    })
})

export const { useLoginMutation,useRegisterMutation, } = userSlice