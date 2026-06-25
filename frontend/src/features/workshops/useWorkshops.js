import { useQuery } from '@tanstack/react-query'
import { workshopsApi } from '../../api/workshopsApi'

export function useWorkshops(params) {
    return useQuery({
        queryKey: ['workshops', params],
        queryFn: () => workshopsApi.getAll(params),
    })
}

export function useWorkshop(id) {
    return useQuery({
        queryKey: ['workshops', id],
        queryFn: () => workshopsApi.getById(id),
        enabled: !!id,
    })
}

export function useWorkshopsByStyle(style) {
    return useQuery({
        queryKey: ['workshops', 'style', style],
        queryFn: () => workshopsApi.getByStyle(style),
        enabled: !!style,
    })
}
