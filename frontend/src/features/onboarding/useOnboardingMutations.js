import { useMutation } from '@tanstack/react-query'
import { userApi } from '../../api/userApi'
import { useAuth } from '../../context/useAuth'

export function useUploadAvatar() {
    const { updateUser } = useAuth()
    return useMutation({
        mutationFn: userApi.uploadAvatar,
        onSuccess: (data) => updateUser(data),
    })
}

export function useUpdateProfile() {
    const { updateUser } = useAuth()
    return useMutation({
        mutationFn: userApi.updateProfile,
        onSuccess: (data) => updateUser(data),
    })
}