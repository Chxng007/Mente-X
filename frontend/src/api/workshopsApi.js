import axiosClient from './axiosClient'

export const workshopsApi = {
    getAll: async (params) => {
        const { data } = await axiosClient.get('/workshops', { params })
        return data
    },
    getById: async (id) => {
        const { data } = await axiosClient.get(`/workshops/${id}`)
        return data
    },
    create: async (payload) => {
        const { data } = await axiosClient.post('/workshops', payload)
        return data
    },
    getByStyle: async (style) => {
        const { data } = await axiosClient.get(`/workshops/style/${style}`)
        return data
    },
}
