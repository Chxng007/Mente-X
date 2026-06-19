import AuthLayout from '../components/layout/AuthLayout'
import RegisterForm from '../features/auth/RegisterForm'

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Únete a DanzApp"
            subtitle="Crea tu cuenta y descubre eventos, talleres e historia de la danza."
        >
            <RegisterForm />
        </AuthLayout>
    )
}