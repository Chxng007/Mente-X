import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import AvatarStep from '../features/onboarding/steps/AvatarStep'
import InterestsStep from '../features/onboarding/steps/InterestsStep'
import BioStep from '../features/onboarding/steps/BioStep'
import CompletionStep from '../features/onboarding/steps/CompletionStep'
import { useUpdateProfile } from '../features/onboarding/useOnboardingMutations'
import { useAuth } from '../context/useAuth'

const TOTAL_STEPS = 4

export default function OnboardingPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const updateProfile = useUpdateProfile()

    const [step, setStep] = useState(1)
    const [danceStyles, setDanceStyles] = useState([])
    const [level, setLevel] = useState(null)
    const [bio, setBio] = useState('')

    const toggleStyle = (value) => {
        setDanceStyles((prev) =>
            prev.includes(value) ? prev.filter((style) => style !== value) : [...prev, value]
        )
    }

    const finalizeAndGoToStep4 = () => {
        updateProfile.mutate(
            { danceStyles, level, bio, onboardingCompleted: true },
            { onSuccess: () => setStep(4), onError: () => setStep(4) }
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4 py-12">
            <div className="mb-8 w-full max-w-xl">
                <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
            </div>

            <Card className="w-full max-w-xl">
                {step === 1 && (
                    <AvatarStep avatarUrl={user?.avatarUrl} onNext={() => setStep(2)} onSkip={() => setStep(2)} />
                )}
                {step === 2 && (
                    <InterestsStep
                        danceStyles={danceStyles}
                        level={level}
                        onToggleStyle={toggleStyle}
                        onSelectLevel={setLevel}
                        onNext={() => setStep(3)}
                        onSkip={() => setStep(3)}
                    />
                )}
                {step === 3 && (
                    <BioStep
                        bio={bio}
                        onChangeBio={setBio}
                        onNext={finalizeAndGoToStep4}
                        onSkip={finalizeAndGoToStep4}
                        isSaving={updateProfile.isPending}
                        error={updateProfile.error}
                    />
                )}
                {step === 4 && (
                    <CompletionStep
                        onFinish={() => navigate('/inicio', { replace: true })}
                        onReview={() => setStep(1)}
                    />
                )}
            </Card>
        </main>
    )
}