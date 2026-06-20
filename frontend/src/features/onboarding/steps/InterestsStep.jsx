import OptionCard from '../../../components/ui/OptionCard'
import Chip from '../../../components/ui/Chip'
import Button from '../../../components/ui/Button'
import { DANCE_STYLES, LEVEL_OPTIONS } from '../onboardingConstants'

export default function InterestsStep({ danceStyles, level, onToggleStyle, onSelectLevel, onNext, onSkip }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-black text-text-primary">¿Qué te pone a bailar?</h1>
                <p className="mt-2 text-text-secondary">
                    Selecciona los géneros que más te apasionan para personalizar tu experiencia.
                </p>
            </div>

            <div>
                <p className="mb-3 text-sm font-semibold text-text-secondary">Tus intereses</p>
                <div className="flex flex-wrap gap-3">
                    {DANCE_STYLES.map(({ value, label, icon: Icon }) => (
                        <Chip
                            key={value}
                            label={label}
                            icon={<Icon className="h-4 w-4" aria-hidden="true" />}
                            selected={danceStyles.includes(value)}
                            onClick={() => onToggleStyle(value)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-3 text-sm font-semibold text-text-secondary">Tu nivel de ritmo</p>
                <div className="grid grid-cols-3 gap-3">
                    {LEVEL_OPTIONS.map(({ value, label, icon: Icon }) => (
                        <OptionCard
                            key={value}
                            label={label}
                            icon={<Icon className="h-5 w-5" aria-hidden="true" />}
                            selected={level === value}
                            onClick={() => onSelectLevel(value)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button onClick={onNext}>Continuar al paso 3</Button>
                <button type="button" onClick={onSkip} className="text-sm font-semibold text-text-secondary hover:underline">
                    Omitir por ahora
                </button>
            </div>
        </div>
    )
}