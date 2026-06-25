import { useParams, Link } from 'react-router-dom'
import { useEvent, useEvents } from '../features/events/useEvents'
import EventCard from '../components/ui/EventCard'

function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')} COP`
}

function SkeletonHero() {
    return (
        <div className="w-full h-72 bg-bg-secondary animate-pulse rounded-card mb-6" />
    )
}

export default function EventDetailPage() {
    const { id } = useParams()
    const { data: event, isLoading, isError } = useEvent(id)
    const { data: allEvents = [] } = useEvents()

    const related = allEvents.filter(e => e.id !== Number(id)).slice(0, 3)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg-primary">
                <SkeletonHero />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="h-6 bg-bg-secondary animate-pulse rounded w-1/3 mb-4" />
                    <div className="h-4 bg-bg-secondary animate-pulse rounded w-2/3 mb-2" />
                    <div className="h-4 bg-bg-secondary animate-pulse rounded w-1/2" />
                </div>
            </div>
        )
    }

    if (isError || !event) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-4">🕺</p>
                    <p className="text-text-secondary text-lg mb-4">Evento no encontrado.</p>
                    <Link to="/eventos" className="text-coral font-semibold hover:underline">← Volver a Eventos</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div
                className="relative w-full bg-bg-secondary overflow-hidden"
                style={{ aspectRatio: '16/7', minHeight: '280px' }}
            >
                {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {event.category && (
                            <span className="bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {event.category}
                            </span>
                        )}
                        {event.city && (
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                📍 {event.city}
                            </span>
                        )}
                    </div>
                    <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-3 max-w-2xl">
                        {event.title}
                    </h1>
                    {event.description && (
                        <p className="text-white/80 text-sm mb-5 max-w-xl line-clamp-2">{event.description}</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-coral text-white font-semibold px-6 py-2.5 rounded-btn hover:bg-coral-hover transition-colors">
                            Reservar mi lugar
                        </button>
                        <button className="border border-white text-white font-semibold px-6 py-2.5 rounded-btn hover:bg-white/10 transition-colors">
                            📅 Añadir al calendario
                        </button>
                    </div>
                </div>
            </div>

            {/* ── INFO BAR ── */}
            <div className="bg-surface border-b border-gray-100 shadow-elevation-1">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-4">
                    {event.eventDate && (
                        <span className="flex items-center gap-2 text-sm text-text-primary font-medium bg-bg-secondary px-4 py-2 rounded-full">
                            📅 {formatDate(event.eventDate)}
                        </span>
                    )}
                    <span className="flex items-center gap-2 text-sm text-white font-medium bg-coral px-4 py-2 rounded-full">
                        💰 {formatPrice(event.price)}
                    </span>
                    {event.level && (
                        <span className="flex items-center gap-2 text-sm text-text-primary font-medium bg-bg-secondary px-4 py-2 rounded-full">
                            🎯 {event.level}
                        </span>
                    )}
                    {event.duration && (
                        <span className="flex items-center gap-2 text-sm text-text-primary font-medium bg-bg-secondary px-4 py-2 rounded-full">
                            ⏱ {event.duration}
                        </span>
                    )}
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column */}
                    <div className="flex-1">
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-3">
                                Sobre el {event.category ?? 'Evento'}
                            </h2>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {event.description ?? 'Información del evento próximamente.'}
                            </p>
                        </section>

                        {event.danceStyle && (
                            <section className="mb-8">
                                <h2 className="text-xl font-black text-text-primary mb-3">Estilo de Danza</h2>
                                <span className="inline-block bg-turquoise text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                                    {event.danceStyle}
                                </span>
                            </section>
                        )}
                    </div>

                    {/* Right column */}
                    <div className="lg:w-80 flex-shrink-0 flex flex-col gap-5">
                        {/* Location card */}
                        <div className="bg-surface rounded-card shadow-elevation-1 overflow-hidden">
                            <div className="h-36 bg-bg-secondary flex items-center justify-center text-text-secondary text-sm">
                                📍 Mapa no disponible aún
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-text-primary text-sm mb-1">Ubicación</h3>
                                {event.address && (
                                    <p className="text-text-secondary text-xs">{event.address}</p>
                                )}
                                {event.city && (
                                    <p className="text-text-secondary text-xs">{event.city}, Colombia</p>
                                )}
                            </div>
                        </div>

                        {/* Price CTA card */}
                        <div className="bg-coral rounded-card p-5 text-white">
                            <p className="font-black text-2xl mb-1">{formatPrice(event.price)}</p>
                            <p className="text-white/80 text-xs mb-4">por persona</p>
                            <ul className="text-sm text-white/90 mb-5 flex flex-col gap-1.5">
                                <li>✓ Acceso al evento completo</li>
                                {event.duration && <li>✓ Duración: {event.duration}</li>}
                                {event.level && <li>✓ Nivel: {event.level}</li>}
                                <li>✓ Certificado de participación</li>
                            </ul>
                            <button className="w-full bg-white text-coral font-black text-sm py-3 rounded-btn hover:bg-white/90 transition-colors">
                                RESERVAR AHORA
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── RELATED EVENTS ── */}
                {related.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-black text-text-primary mb-5">
                            Eventos que podrían interesarte
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {related.map(e => (
                                <EventCard key={e.id} event={e} variant="compact" />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
