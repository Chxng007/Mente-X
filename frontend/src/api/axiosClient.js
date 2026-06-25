import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const axiosClient = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('danzapp_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('danzapp_token')
            localStorage.removeItem('danzapp_user')
        }
        return Promise.reject(error)
    }
)

export default axiosClient