import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Alert from '../../components/ui/Alert'
import { useForm } from '../../hooks/useForm'
import { validateRegisterForm } from './authValidators'
import { useRegister } from './useAuthMutations'
import { extractErrorMessage } from '../../utils/errors'

const ROLE_OPTIONS = [
    { value: 'USER', label: 'Bailarín / Usuario' },
    { value: 'ACADEMY', label: 'Academia' },
]

export default function RegisterForm() {
    const navigate = useNavigate()
    const registerMutation = useRegister()
    const [role, setRole] = useState('USER')

    const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm({
        initialValues: { name: '', email: '', password: '', confirmPassword: '' },
        validate: validateRegisterForm,
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateAll()) return

        registerMutation.mutate(
            { name: values.name, email: values.email, password: values.password, role },
            {
                onSuccess: () => {
                    navigate('/iniciar-sesion', { replace: true, state: { registered: true } })
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {registerMutation.isError && (
                <Alert variant="error">
                    {extractErrorMessage(registerMutation.error, 'No se pudo completar el registro.')}
                </Alert>
            )}

            <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-text-primary">Quiero registrarme como</span>
                <div className="grid grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setRole(option.value)}
                            className={`rounded-btn border px-4 py-2.5 text-sm font-semibold transition-colors ${role === option.value
                                    ? 'border-turquoise bg-turquoise/10 text-turquoise'
                                    : 'border-neutral-200 text-text-secondary hover:border-turquoise/50'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <Input
                label="Nombre completo"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Tu nombre"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name ? errors.name : undefined}
            />

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
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
            />

            <Input
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            <Button type="submit" isLoading={registerMutation.isPending} className="mt-2">
                Crear cuenta
            </Button>

            <p className="text-center text-sm text-text-secondary">
                ¿Ya tienes cuenta?{' '}
                <Link to="/iniciar-sesion" className="font-semibold text-turquoise hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </form>
    )
}