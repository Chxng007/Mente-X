import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function formatPrice(price) {
    if (price === null || price === undefined || price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')}`
}

/** Compact horizontal row used in the genre columns (Salsa, Champeta…). */
export default function WorkshopListRow({ workshop, accent = 'turquoise' }) {
    const accentText = accent === 'coral' ? 'text-coral' : 'text-turquoise'
    const subtitle = workshop.academyName ?? workshop.instructorName

    return (
        <Link
            to={`/talleres/${workshop.id}`}
            className="group flex items-center gap-3 rounded-card bg-surface shadow-elevation-1 p-3 hover:shadow-md transition-shadow"
        >
            <div className="w-14 h-14 rounded-xl bg-bg-secondary overflow-hidden shrink-0">
                {workshop.imageUrl && (
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-text-primary text-sm leading-snug truncate group-hover:text-coral transition-colors">
                    {workshop.title}
                </h4>
                {subtitle && (
                    <p className="text-text-secondary text-xs truncate">{subtitle}</p>
                )}
                <p className={`text-xs font-semibold mt-0.5 ${accentText}`}>
                    {formatPrice(workshop.price)}{' '}
                    <span className="text-text-secondary font-normal">/ Clase</span>
                </p>
            </div>

            <ArrowRight
                size={18}
                className="text-text-secondary group-hover:text-coral transition-colors shrink-0"
            />
        </Link>
    )
}