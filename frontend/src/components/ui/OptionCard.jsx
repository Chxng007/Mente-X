export default function OptionCard({ icon, label, selected = false, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`flex flex-col items-center justify-center gap-2 rounded-input border px-4 py-5 text-center transition-colors ${selected
                    ? 'border-turquoise bg-turquoise/5 text-turquoise'
                    : 'border-neutral-200 text-text-primary hover:border-turquoise/40'
                }`}
        >
            {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
            <span className="text-sm font-semibold">{label}</span>
        </button>
    )
}