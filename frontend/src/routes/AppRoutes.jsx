import { Navigate, Route, Routes } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import OnboardingPage from '../pages/OnboardingPage'
import HomePage from '../pages/HomePage'
import EventsPage from '../pages/EventsPage'
import EventDetailPage from '../pages/EventDetailPage'
import WorkshopsPage from '../pages/WorkshopsPage'
import WorkshopDetailPage from '../pages/WorkshopDetailPage'
import HistoryPage from '../pages/HistoryPage'
import HistoryArticlePage from '../pages/HistoryArticlePage'
import MainLayout from '../components/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'

export default function AppRoutes() {
    return (
        <Routes>
            {/* Guest-only routes */}
            <Route path="/" element={<GuestRoute><WelcomePage /></GuestRoute>} />
            <Route path="/iniciar-sesion" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/registro" element={<GuestRoute><RegisterPage /></GuestRoute>} />

            {/* Auth-required routes */}
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path="/inicio" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

            {/* Public routes (navbar visible, no auth required) */}
            <Route path="/eventos" element={<MainLayout><EventsPage /></MainLayout>} />
            <Route path="/eventos/:id" element={<MainLayout><EventDetailPage /></MainLayout>} />
            <Route path="/talleres" element={<MainLayout><WorkshopsPage /></MainLayout>} />
            <Route path="/talleres/:id" element={<MainLayout><WorkshopDetailPage /></MainLayout>} />
            <Route path="/historia" element={<MainLayout><HistoryPage /></MainLayout>} />
            <Route path="/historia/:id" element={<MainLayout><HistoryArticlePage /></MainLayout>} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
