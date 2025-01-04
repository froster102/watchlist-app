import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    accessToken: '',
    setAccessToken: (accessToken) => set((state) => ({ accessToken }))
}))