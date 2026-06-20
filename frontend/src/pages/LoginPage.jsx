import { useLocation } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import LoginForm from '../features/auth/LoginForm'
import Alert from '../components/ui/Alert'

export default function LoginPage() {
    const location = useLocation()
    const justRegistered = Boolean(location.state?.registered)

    return (
        <AuthLayout
            title="Bienvenido de nuevo"
            subtitle="Inicia sesión para seguir explorando la comunidad de danza."
        >
            {justRegistered && (
                <Alert variant="success" className="mb-5">
                    Cuenta creada con éxito. Inicia sesión para continuar.
                </Alert>
            )}
            <LoginForm />
        </AuthLayout>
    )
}