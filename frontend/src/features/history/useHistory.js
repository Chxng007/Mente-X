import { useQuery } from '@tanstack/react-query'
import { historyApi } from '../../api/historyApi'

export function useHistory(params) {
    return useQuery({
        queryKey: ['history', params],
        queryFn: () => historyApi.getAll(params),
    })
}

export function useHistoryArticle(id) {
    return useQuery({
        queryKey: ['history', id],
        queryFn: () => historyApi.getById(id),
        enabled: !!id,
    })
}

export function useFeaturedHistory() {
    return useQuery({
        queryKey: ['history', 'featured'],
        queryFn: () => historyApi.getFeatured(),
    })
}
