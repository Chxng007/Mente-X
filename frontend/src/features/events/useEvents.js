import { useQuery } from '@tanstack/react-query'
import { eventsApi } from '../../api/eventsApi'

export function useEvents(params) {
    return useQuery({
        queryKey: ['events', params],
        queryFn: () => eventsApi.getAll(params),
    })
}

export function useEvent(id) {
    return useQuery({
        queryKey: ['events', id],
        queryFn: () => eventsApi.getById(id),
        enabled: !!id,
    })
}

export function useFeaturedEvents() {
    return useQuery({
        queryKey: ['events', 'featured'],
        queryFn: () => eventsApi.getFeatured(),
    })
}
