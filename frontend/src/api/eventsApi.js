import axiosClient from './axiosClient'

export const eventsApi = {
    getAll: async (params) => {
        const { data } = await axiosClient.get('/events', { params })
        return data
    },
    getById: async (id) => {
        const { data } = await axiosClient.get(`/events/${id}`)
        return data
    },
    create: async (payload) => {
        const { data } = await axiosClient.post('/events', payload)
        return data
    },
    getFeatured: async () => {
        const { data } = await axiosClient.get('/events/featured')
        return data
    },
    getByCity: async (city) => {
        const { data } = await axiosClient.get(`/events/city/${city}`)
        return data
    },
}
