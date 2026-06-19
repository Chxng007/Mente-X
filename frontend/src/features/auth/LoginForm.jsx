import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Alert from '../../components/ui/Alert'
import { useForm } from '../../hooks/useForm'
import { validateLoginForm } from './authValidators'
import { useLogin } from './useAuthMutations'
import { extractErrorMessage } from '../../utils/errors'

export default function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const loginMutation = useLogin()

    const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm({
        initialValues: { email: '', password: '' },
        validate: validateLoginForm,
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateAll()) return

        loginMutation.mutate(
            { email: values.email, password: values.password },
            {
                onSuccess: () => {
                    const redirectTo = location.state?.from ?? '/'
                    navigate(redirectTo, { replace: true })
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {loginMutation.isError && (
                <Alert variant="error">
                    {extractErrorMessage(loginMutation.error, 'Correo o contraseña incorrectos.')}
                </Alert>
            )}

            <Input
                label="Correo electrónico"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
            />

            <Input
                label="Contraseña"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
            />

            <Button type="submit" isLoading={loginMutation.isPending} className="mt-2">
                Iniciar sesión
            </Button>

            <p className="text-center text-sm text-text-secondary">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="font-semibold text-turquoise hover:underline">
                    Regístrate
                </Link>
            </p>
        </form>
    )
}