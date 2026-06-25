import { PartyPopper } from 'lucide-react'
import Button from '../../../components/ui/Button'

export default function CompletionStep({ onFinish, onReview }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-turquoise/10 text-turquoise">
                <PartyPopper className="h-10 w-10" aria-hidden="true" />
            </span>
            <div>
                <h1 className="text-3xl font-black text-text-primary">¡Todo listo para brillar!</h1>
                <p className="mt-2 max-w-sm text-text-secondary">
                    Has completado tu perfil. Ahora puedes empezar a descubrir eventos, talleres y conectar con la comunidad.
                </p>
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button onClick={onFinish}>Comenzar mi experiencia</Button>
                <Button variant="secondary" onClick={onReview}>
                    Volver a revisar perfil
                </Button>
            </div>
        </div>
    )
}