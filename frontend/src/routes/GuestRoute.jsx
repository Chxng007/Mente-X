import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function GuestRoute({ children }) {
    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated) {
        return <Navigate to={user?.onboardingCompleted ? '/inicio' : '/onboarding'} replace />
    }

    return children
}