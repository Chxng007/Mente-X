import { Navigate, Route, Routes } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import OnboardingPage from '../pages/OnboardingPage'
import HomePage from '../pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GuestRoute><WelcomePage /></GuestRoute>} />
            <Route path="/iniciar-sesion" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/registro" element={<GuestRoute><RegisterPage /></GuestRoute>} />

            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path="/inicio" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}