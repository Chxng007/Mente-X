import { useParams, Link } from 'react-router-dom'
import { useEvent, useEvents } from '../features/events/useEvents'
import EventCard from '../components/ui/EventCard'

function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toFixed(2)} USD`
}

function CalendarIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    )
}

function CardIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
    )
}

function BarChartIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
    )
}

function InfoCol({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-turquoise/10 rounded-full flex items-center justify-center text-turquoise shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-text-primary leading-tight">{value}</p>
            </div>
        </div>
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
                <div className="w-full h-72 bg-bg-secondary animate-pulse mb-6" />
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

    const instructors = event.instructors ?? (event.instructorName ? [{ name: event.instructorName, style: event.danceStyle }] : [])

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div className="relative w-full bg-bg-secondary overflow-hidden" style={{ minHeight: '320px' }}>
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-cover" />
                ) : (
                    <div className="w-full h-96 bg-bg-secondary" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

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
                        <button className="bg-coral text-white font-bold px-7 py-3 rounded-btn hover:bg-coral-hover transition-colors inline-flex items-center gap-2">
                            Reservar mi Lugar <span>→</span>
                        </button>
                        <button className="border border-white/50 text-white font-semibold px-5 py-3 rounded-btn hover:bg-white/10 transition-colors text-sm">
                            📅 Añadir al calendario
                        </button>
                    </div>
                </div>
            </div>

            {/* ── INFO BAR ── */}
            <div className="bg-surface border-b border-gray-100 shadow-elevation-1">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-6">
                    {event.eventDate && (
                        <InfoCol icon={<CalendarIcon />} label="FECHA" value={formatDate(event.eventDate)} />
                    )}
                    <InfoCol icon={<CardIcon />} label="PRECIO" value={formatPrice(event.price)} />
                    {event.level && (
                        <InfoCol icon={<BarChartIcon />} label="NIVEL" value={event.level} />
                    )}
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column */}
                    <div className="flex-1 min-w-0">
                        {/* About */}
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-3">
                                Sobre el {event.category ?? 'Evento'}
                            </h2>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {event.description ?? 'Información del evento próximamente.'}
                            </p>
                        </section>

                        {/* Instructor line-up */}
                        {instructors.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-xl font-black text-text-primary mb-4">Line-up de Instructores</h2>
                                <div className="flex flex-wrap gap-6">
                                    {instructors.map((inst, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 text-center w-24">
                                            <div className="w-16 h-16 rounded-full bg-coral text-white font-black text-xl flex items-center justify-center">
                                                {inst.name?.charAt(0).toUpperCase() ?? '?'}
                                            </div>
                                            <p className="font-bold text-text-primary text-xs leading-tight">{inst.name}</p>
                                            {inst.style && (
                                                <p className="text-turquoise text-xs font-semibold">{inst.style}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Dance style */}
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
                    <div className="lg:w-80 shrink-0 flex flex-col gap-5">
                        {/* Location card */}
                        <div className="bg-surface rounded-card shadow-elevation-1 overflow-hidden">
                            <div className="h-36 bg-bg-secondary flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-2xl mb-1">📍</p>
                                    <p className="text-text-secondary text-xs">Mapa próximamente</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-text-primary text-sm mb-1">Ubicación</h3>
                                {event.venueName && (
                                    <p className="text-text-primary text-sm font-semibold">{event.venueName}</p>
                                )}
                                {event.address && (
                                    <p className="text-text-secondary text-xs mt-0.5">{event.address}</p>
                                )}
                                {event.city && (
                                    <p className="text-turquoise text-xs font-semibold mt-0.5">{event.city}, Colombia</p>
                                )}
                                {!event.address && !event.city && (
                                    <p className="text-text-secondary text-xs">Por confirmar</p>
                                )}
                                <button className="mt-3 w-full text-center border border-gray-300 text-text-secondary text-xs font-semibold py-2 rounded-btn hover:border-turquoise hover:text-turquoise transition-colors">
                                    Ver en Google Maps
                                </button>
                            </div>
                        </div>

                        {/* Price CTA card */}
                        <div className="bg-coral rounded-card p-5 text-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">PASES LIMITADOS</p>
                            <p className="font-black text-3xl mb-0.5">{formatPrice(event.price)}</p>
                            <p className="text-white/70 text-xs mb-4">por persona</p>
                            <ul className="text-sm text-white/90 mb-5 flex flex-col gap-2">
                                <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Acceso a todos los talleres</li>
                                <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Gala de clausura incluida</li>
                                <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Kit de bienvenida DanzApp</li>
                            </ul>
                            <button className="w-full bg-white text-coral font-black text-sm py-3 rounded-btn hover:bg-white/90 transition-colors uppercase tracking-wide">
                                Reservar Ahora
                            </button>
                            <p className="text-white/50 text-xs text-center mt-3">Pago seguro procesado por DanzPay</p>
                        </div>
                    </div>
                </div>

                {/* ── RELATED EVENTS ── */}
                {related.length > 0 && (
                    <section className="mt-12">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-black text-text-primary">Eventos que podrían interesarte</h2>
                            <Link to="/eventos" className="text-sm font-semibold text-turquoise hover:underline flex items-center gap-1">
                                Ver todos <span>↗</span>
                            </Link>
                        </div>
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
