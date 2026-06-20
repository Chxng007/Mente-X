export default function Chip({ label, icon, selected = false, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${selected
                    ? 'border-turquoise bg-turquoise/10 text-turquoise'
                    : 'border-neutral-200 text-text-primary hover:border-turquoise/50'
                }`}
        >
            {icon}
            {label}
        </button>
    )
}