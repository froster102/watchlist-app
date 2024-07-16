import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'user/register',
                method: 'POST',
                body: { ...data }
            })
        }),
        getProfile: builder.query({
            query: () => ({
                url: `user/profile`,
                method: 'GET'
            })
        }),
        addImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file)
                console.log(file)
                return {
                    url: 'user/profile/addImage',
                    method: 'POST',
                    body: formData,
                }
            }
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useAddImageMutation } = userApiSlice