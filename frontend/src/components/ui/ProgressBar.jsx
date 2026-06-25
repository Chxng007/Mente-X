export default function ProgressBar({ step, totalSteps }) {
    const percent = (step / totalSteps) * 100

    return (
        <div className="w-full">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
                <div
                    className="h-full rounded-full bg-coral transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-text-secondary">
                Paso {step} de {totalSteps}
            </p>
        </div>
    )
}