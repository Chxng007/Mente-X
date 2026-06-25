import axiosClient from './axiosClient'

export const userApi = {
    getMe: async () => {
        const { data } = await axiosClient.get('/users/me')
        return data
    },
    updateProfile: async (payload) => {
        const { data } = await axiosClient.patch('/users/me', payload)
        return data
    },
    uploadAvatar: async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await axiosClient.post('/users/me/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return data
    },
}