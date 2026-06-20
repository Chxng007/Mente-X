import axiosClient from './axiosClient'

export const authApi = {
    // POST /api/auth/signin -> JwtResponse { token, type, id, email, roles }
    login: async ({ email, password }) => {
        const { data } = await axiosClient.post('/auth/signin', { email, password })
        return data
    },

    // POST /api/auth/signup -> string "User registered successfully!"
    register: async ({ email, password, name, role }) => {
        const { data } = await axiosClient.post('/auth/signup', {
            email,
            password,
            name,
            role,
        })
        return data
    },
}