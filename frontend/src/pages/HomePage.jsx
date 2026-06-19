import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
    const { user, logout } = useAuth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-primary px-4 text-center">
            <div>
                <p className="text-sm font-bold uppercase tracking-widest text-coral">DanzApp</p>
                <h1 className="mt-2 text-3xl font-black text-text-primary">¡Hola, {user?.name ?? user?.email}!</h1>                <p className="mt-2 text-text-secondary">Sesión iniciada correctamente.</p>
            </div>
            <Button variant="secondary" fullWidth={false} onClick={logout}>
                Cerrar sesión
            </Button>
        </main>
    )
}