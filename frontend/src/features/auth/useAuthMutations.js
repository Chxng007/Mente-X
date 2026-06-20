import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'

export function useLogin() {
    const { persistSession } = useAuth()

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            persistSession(data)
        },
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: authApi.register,
    })
}