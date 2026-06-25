import { useRef, useState } from 'react'
import { Camera, Plus } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import { useUploadAvatar } from '../useOnboardingMutations'
import { extractErrorMessage } from '../../../utils/errors'

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export default function AvatarStep({ avatarUrl, onNext, onSkip }) {
    const fileInputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const uploadAvatar = useUploadAvatar()

    const resolvedAvatarUrl = previewUrl ?? (avatarUrl ? `${apiUrl}${avatarUrl}` : null)

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        setPreviewUrl(URL.createObjectURL(file))
        uploadAvatar.mutate(file)
    }

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-black text-text-primary">¡Ponle rostro al ritmo!</h1>
            <p className="max-w-md text-text-secondary">
                Sube una foto para que tus compañeros de baile puedan reconocerte en la pista y en los talleres.
            </p>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-48 w-48 flex-col items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-dashed border-coral/40 bg-bg-secondary text-text-secondary transition-colors hover:border-coral"
                >
                    {resolvedAvatarUrl ? (
                        <img src={resolvedAvatarUrl} alt="Foto de perfil" className="h-full w-full object-cover" />
                    ) : (
                        <>
                            <Camera className="h-10 w-10" />
                            <span className="text-xs font-bold uppercase tracking-wide">Subir foto</span>
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Subir foto"
                    className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white shadow-elevation-1 transition-colors hover:bg-coral-hover"
                >
                    <Plus className="h-5 w-5" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {uploadAvatar.isError && (
                <Alert variant="error">{extractErrorMessage(uploadAvatar.error, 'No se pudo subir la imagen.')}</Alert>
            )}

            <div className="flex w-full max-w-xs flex-col gap-3">
                <Button onClick={onNext} isLoading={uploadAvatar.isPending}>
                    Continuar
                </Button>
                <button type="button" onClick={onSkip} className="text-sm font-semibold text-turquoise hover:underline">
                    Omitir por ahora
                </button>
            </div>
        </div>
    )
}