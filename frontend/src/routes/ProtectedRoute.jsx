import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, user } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/iniciar-sesion" replace state={{ from: location.pathname }} />
    }

    if (!user?.onboardingCompleted && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />
    }

    return children
}