import { useNavigate, Link } from 'react-router-dom'
import { Mail, Sparkles } from 'lucide-react'
import PublicNavbar from '../components/layout/PublicNavbar'
import Button from '../components/ui/Button'

export default function WelcomePage() {
    const navigate = useNavigate()

    return (
        <main className="flex h-screen overflow-hidden flex-col bg-bg-primary lg:flex-row">
            <div className="relative h-72 w-full overflow-hidden lg:h-auto lg:w-1/2">
                <img
                    src="/images/hero-cartagena.jpg"
                    alt="Bailarines celebrando en las calles de Cartagena"
                    className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-card bg-surface/95 p-4 shadow-elevation-2 sm:left-6 sm:right-auto sm:max-w-xs">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-turquoise/10 text-turquoise">
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                        <p className="text-sm font-bold text-text-primary">Cultura Ancestral</p>
                        <p className="text-xs text-text-secondary">Expresión urbana y tradicional</p>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col lg:w-1/2">
                <PublicNavbar />

                <div className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-6 sm:px-12">
                    <h1 className="max-w-md text-4xl font-black leading-tight text-text-primary sm:text-5xl">
                        Siente el <span className="text-coral">RITMO</span> del Caribe
                    </h1>
                    <p className="mt-6 max-w-md text-text-secondary">
                        Descubre los mejores eventos, talleres y la historia de la danza que mueve al mundo con un toque urbano y ancestral.
                    </p>

                    <div className="mt-8 max-w-sm">
                        <Button onClick={() => navigate('/registro')}>
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            Registrarse con Email
                        </Button>
                    </div>

                    <div className="my-6 flex max-w-sm items-center gap-3 text-xs font-semibold uppercase text-text-secondary">
                        <span className="h-px flex-1 bg-neutral-200" />
                        o continúa con
                        <span className="h-px flex-1 bg-neutral-200" />
                    </div>

                    <div className="grid max-w-sm grid-cols-2 gap-3">
                        <button
                            type="button"
                            disabled
                            title="Disponible próximamente"
                            className="flex items-center justify-center gap-2 rounded-btn border border-neutral-200 px-4 py-3 text-sm font-semibold text-text-secondary opacity-60"
                        >
                            Google
                        </button>
                        <button
                            type="button"
                            disabled
                            title="Disponible próximamente"
                            className="flex items-center justify-center gap-2 rounded-btn border border-neutral-200 px-4 py-3 text-sm font-semibold text-text-secondary opacity-60"
                        >
                            Facebook
                        </button>
                    </div>

                    <p className="mt-8 text-sm text-text-secondary">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/iniciar-sesion" className="font-semibold text-turquoise hover:underline">
                            Ya tengo cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}