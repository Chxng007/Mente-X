import axiosClient from './axiosClient'

export const historyApi = {
    getAll: async (params) => {
        const { data } = await axiosClient.get('/history', { params })
        return data
    },
    getById: async (id) => {
        const { data } = await axiosClient.get(`/history/${id}`)
        return data
    },
    getFeatured: async () => {
        const { data } = await axiosClient.get('/history/featured')
        return data
    },
}
