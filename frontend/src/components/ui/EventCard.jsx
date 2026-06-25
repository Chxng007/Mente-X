import { Link } from 'react-router-dom'

function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')}`
}

/** variant: 'featured' | 'compact' */
export default function EventCard({ event, variant = 'compact' }) {
    if (variant === 'featured') {
        return (
            <Link
                to={`/eventos/${event.id}`}
                className="group relative block rounded-card overflow-hidden min-h-64 bg-bg-secondary"
                style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                {/* category chip top-left */}
                {event.category && (
                    <span className="absolute top-3 left-3 z-10 bg-turquoise text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {event.category}
                    </span>
                )}

                {/* price badge top-right */}
                <span className="absolute top-3 right-3 z-10 bg-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                    {formatPrice(event.price)}
                </span>

                {/* content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-white font-black text-lg leading-tight mb-1 group-hover:text-sand transition-colors">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/80 text-xs mb-3">
                        {event.eventDate && <span>📅 {formatDate(event.eventDate)}</span>}
                        {event.city && <span>📍 {event.city}</span>}
                    </div>
                    <span className="inline-block bg-coral text-white text-xs font-semibold px-3 py-1.5 rounded-btn hover:bg-coral-hover transition-colors">
                        Inscribirme
                    </span>
                </div>
            </Link>
        )
    }

    // compact variant
    return (
        <Link
            to={`/eventos/${event.id}`}
            className="group block rounded-card bg-surface shadow-elevation-1 overflow-hidden hover:shadow-md transition-shadow"
        >
            {/* image */}
            <div className="relative h-40 bg-bg-secondary">
                {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                )}
                {event.category && (
                    <span className="absolute top-2 left-2 bg-turquoise text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                        {event.category}
                    </span>
                )}
                <span className="absolute top-2 right-2 bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {formatPrice(event.price)}
                </span>
            </div>

            {/* text */}
            <div className="p-4">
                <h3 className="font-bold text-text-primary text-sm leading-snug mb-2 group-hover:text-coral transition-colors line-clamp-2">
                    {event.title}
                </h3>
                <div className="flex flex-col gap-1 text-text-secondary text-xs mb-3">
                    {event.eventDate && <span>📅 {formatDate(event.eventDate)}</span>}
                    {event.city && <span>📍 {event.city}</span>}
                    {event.level && <span className="text-turquoise font-medium">{event.level}</span>}
                </div>
                <span className="inline-block bg-coral text-white text-xs font-semibold px-3 py-1.5 rounded-btn hover:bg-coral-hover transition-colors">
                    Inscribirme
                </span>
            </div>
        </Link>
    )
}
