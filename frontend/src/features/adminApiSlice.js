import { apiSlice } from './apiSlice'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (credentials) => ({
                url: '/admin/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: 'admin/',
                method: 'GET',
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: 'admin/deleteUser',
                method: 'DELETE',
                body: { id }
            })
        }),
        editUserInfo: builder.mutation({
            query: (userInfo) => {
                return {
                    url: 'admin/editUser',
                    method: 'PATCH',
                    body: {...userInfo }
                }
            }})
    })
})

export const { useAdminLoginMutation, useGetUsersQuery, useDeleteUserMutation, useEditUserInfoMutation } = adminApiSlice