import { BookOpen } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Textarea from '../../../components/ui/Textarea'
import Alert from '../../../components/ui/Alert'
import { extractErrorMessage } from '../../../utils/errors'

const MAX_BIO_LENGTH = 300

export default function BioStep({ bio, onChangeBio, onNext, onSkip, isSaving, error }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10 text-coral">
                <BookOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
                <h1 className="text-2xl font-black text-text-primary">Cuéntanos tu historia</h1>
                <p className="mt-2 max-w-sm text-text-secondary">
                    Escribe una breve biografía para que la comunidad te conozca mejor. (Opcional)
                </p>
            </div>

            {error && <Alert variant="error">{extractErrorMessage(error, 'No se pudo guardar tu perfil.')}</Alert>}

            <div className="w-full text-left">
                <Textarea
                    value={bio}
                    onChange={(event) => onChangeBio(event.target.value)}
                    maxLength={MAX_BIO_LENGTH}
                    placeholder="Me apasiona el ritmo y quiero aprender..."
                />
            </div>

            <div className="flex w-full flex-col gap-3">
                <Button onClick={onNext} isLoading={isSaving}>
                    Continuar al paso 4
                </Button>
                <button type="button" onClick={onSkip} className="text-sm font-semibold text-turquoise hover:underline">
                    Omitir por ahora
                </button>
            </div>
        </div>
    )
}