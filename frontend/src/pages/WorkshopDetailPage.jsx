import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useWorkshop, useWorkshops } from '../features/workshops/useWorkshops'
import WorkshopCard from '../components/ui/WorkshopCard'

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')} COP`
}

function formatPriceUSD(price) {
    if (!price) return 'Gratis'
    return `$${Number(price).toFixed(2)} USD`
}

function modalityLabel(modality) {
    const map = { VIRTUAL: 'Online', PRESENCIAL: 'Presencial', HYBRID: 'Híbrido' }
    return map[modality] ?? modality ?? ''
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

function UsersIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    )
}

function InfoChip({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3 bg-bg-secondary rounded-full px-4 py-2.5">
            <span className="text-turquoise shrink-0">{icon}</span>
            <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-text-primary leading-tight">{value}</p>
            </div>
        </div>
    )
}

function AccordionItem({ weekLabel, title, content, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border border-gray-200 rounded-card overflow-hidden mb-2">
            <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-bg-secondary transition-colors"
                onClick={() => setOpen(v => !v)}
            >
                <div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">{weekLabel}</p>
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                </div>
                <span className="text-text-secondary ml-4 shrink-0 text-xs">{open ? '▲' : '▶'}</span>
            </button>
            {open && (
                <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-gray-100">
                    {content}
                </div>
            )}
        </div>
    )
}

export default function WorkshopDetailPage() {
    const { id } = useParams()
    const { data: workshop, isLoading, isError } = useWorkshop(id)
    const { data: allWorkshops = [] } = useWorkshops()

    const related = allWorkshops.filter(w => w.id !== Number(id)).slice(0, 3)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg-primary">
                <div className="w-full h-72 bg-bg-secondary animate-pulse mb-6" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="h-6 bg-bg-secondary animate-pulse rounded w-1/3 mb-4" />
                    <div className="h-4 bg-bg-secondary animate-pulse rounded w-2/3 mb-2" />
                </div>
            </div>
        )
    }

    if (isError || !workshop) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-4">💃</p>
                    <p className="text-text-secondary text-lg mb-4">Taller no encontrado.</p>
                    <Link to="/talleres" className="text-coral font-semibold hover:underline">← Volver a Talleres</Link>
                </div>
            </div>
        )
    }

    const learnings = workshop.learnings ?? [
        'Técnica de punteo avanzado',
        'Coordinación de brazos',
        'Repiques y adornos',
        'Control de respiración',
    ]

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div className="relative w-full overflow-hidden" style={{ minHeight: '360px' }}>
                {workshop.imageUrl ? (
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-96 object-cover" />
                ) : (
                    <div className="w-full h-96 bg-bg-secondary" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {workshop.level && (
                            <span className="bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {workshop.level}
                            </span>
                        )}
                        {workshop.durationWeeks && (
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {workshop.durationWeeks} Semanas
                            </span>
                        )}
                    </div>
                    <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-3 max-w-2xl">
                        {workshop.title}
                    </h1>
                    {workshop.shortDescription && (
                        <p className="text-white/75 text-sm mb-5 max-w-xl line-clamp-2">{workshop.shortDescription}</p>
                    )}
                    <button className="bg-coral text-white font-bold px-7 py-3 rounded-btn hover:bg-coral-hover transition-colors inline-flex items-center gap-2">
                        Inscribirme Ahora <span>→</span>
                    </button>
                </div>
            </div>

            {/* ── INFO CHIPS BAR ── */}
            <div className="bg-surface border-b border-gray-100 shadow-elevation-1">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-3">
                    {workshop.schedule && (
                        <InfoChip icon={<CalendarIcon />} label="HORARIO" value={workshop.schedule} />
                    )}
                    <InfoChip icon={<CardIcon />} label="INVERSIÓN" value={formatPriceUSD(workshop.price)} />
                    {workshop.capacity && (
                        <InfoChip icon={<UsersIcon />} label="CUPO" value={`Máx. ${workshop.capacity} Estudiantes`} />
                    )}
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left column */}
                    <div className="flex-1 min-w-0">
                        {/* About */}
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-3">Sobre este taller</h2>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                {workshop.description ?? 'Información del taller próximamente.'}
                            </p>
                        </section>

                        {/* What you'll learn */}
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-4">¿Qué aprenderás?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {learnings.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-bg-secondary rounded-card p-3">
                                        <span className="text-turquoise font-bold mt-0.5 shrink-0">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        <span className="text-text-primary text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Programa del taller */}
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-4">Programa del Taller</h2>
                            <AccordionItem
                                weekLabel="SEMANA 1"
                                title="Fundamentos y base rítmica"
                                content="Introducción a los pasos básicos, postura corporal, musicalidad y conexión con la pareja."
                                defaultOpen
                            />
                            <AccordionItem
                                weekLabel="SEMANA 2"
                                title="Figuras y combinaciones"
                                content="Aprenderás figuras intermedias, giros y combinaciones fluidas con la música."
                            />
                            <AccordionItem
                                weekLabel="SEMANA 3"
                                title="Estilo y expresión"
                                content="Desarrolla tu propio estilo, footwork avanzado y expresión corporal."
                            />
                            <AccordionItem
                                weekLabel="SEMANA 4"
                                title="Coreografía final"
                                content="Montaje de una coreografía completa para presentar en la clase de clausura."
                            />
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="lg:w-80 shrink-0 flex flex-col gap-5">
                        {/* Location */}
                        <div className="bg-surface rounded-card shadow-elevation-1 overflow-hidden">
                            <div className="h-36 bg-bg-secondary flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-2xl mb-1">📍</p>
                                    <p className="text-text-secondary text-xs">Mapa próximamente</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-text-primary text-sm mb-1">Ubicación</h3>
                                {workshop.venueName && (
                                    <p className="text-text-primary text-sm font-semibold">{workshop.venueName}</p>
                                )}
                                {workshop.address && (
                                    <p className="text-text-secondary text-xs mt-0.5">{workshop.address}</p>
                                )}
                                {workshop.city && (
                                    <p className="text-turquoise text-xs font-semibold mt-0.5">{workshop.city}, Colombia</p>
                                )}
                                {!workshop.address && !workshop.city && (
                                    <p className="text-text-secondary text-xs">{modalityLabel(workshop.modality) ?? 'Por confirmar'}</p>
                                )}
                                <button className="mt-3 w-full text-center border border-gray-300 text-text-secondary text-xs font-semibold py-2 rounded-btn hover:border-turquoise hover:text-turquoise transition-colors">
                                    Ver en Google Maps
                                </button>
                            </div>
                        </div>

                        {/* Price CTA */}
                        <div className="bg-coral rounded-card p-5 text-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">¡CUPOS LIMITADOS!</p>
                            <p className="font-black text-3xl mb-0.5">{formatPriceUSD(workshop.price)}</p>
                            <ul className="text-sm text-white/90 mb-5 flex flex-col gap-2 mt-4">
                                {workshop.modality === 'PRESENCIAL' && <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Acceso a clases presenciales</li>}
                                {workshop.modality === 'VIRTUAL' && <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Acceso a clases virtuales</li>}
                                <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Material de práctica digital</li>
                                <li className="flex items-center gap-2"><span className="text-white/70">✓</span> Certificado de participación</li>
                            </ul>
                            <button className="w-full bg-white text-coral font-black text-sm py-3 rounded-btn hover:bg-white/90 transition-colors uppercase tracking-wide">
                                Reservar mi Lugar
                            </button>
                            <p className="text-white/50 text-xs text-center mt-3">Pago seguro con tarjeta, PayPal o transferencia local</p>
                        </div>
                    </div>
                </div>

                {/* ── INSTRUCTOR ── */}
                {workshop.instructorName && (
                    <section className="mt-12 bg-surface rounded-card shadow-elevation-1 p-6">
                        <h2 className="text-xl font-black text-text-primary mb-5">Tu Instructor/a</h2>
                        <div className="flex items-start gap-5">
                            {workshop.instructorAvatarUrl ? (
                                <div className="relative shrink-0">
                                    <img
                                        src={workshop.instructorAvatarUrl}
                                        alt={workshop.instructorName}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <span className="absolute -bottom-1 -right-1 bg-coral text-white text-xs p-1 rounded-full">🏆</span>
                                </div>
                            ) : (
                                <div className="relative w-20 h-20 rounded-full bg-coral text-white text-2xl font-black flex items-center justify-center shrink-0">
                                    {workshop.instructorName.charAt(0).toUpperCase()}
                                    <span className="absolute -bottom-1 -right-1 bg-turquoise text-white text-xs p-1 rounded-full">🏆</span>
                                </div>
                            )}
                            <div>
                                {workshop.instructorTitle && (
                                    <p className="text-coral text-xs font-bold uppercase tracking-widest mb-1">{workshop.instructorTitle}</p>
                                )}
                                <h3 className="font-black text-text-primary text-lg mb-1">{workshop.instructorName}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {workshop.instructorBio ?? 'Instructor/a con amplia experiencia en la enseñanza de la danza colombiana. Su pasión por compartir el arte y la cultura hace de cada clase una experiencia única.'}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── RELATED WORKSHOPS ── */}
                {related.length > 0 && (
                    <section className="mt-12">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-black text-text-primary">Talleres que podrían interesarte</h2>
                            <Link to="/talleres" className="text-sm font-semibold text-turquoise hover:underline flex items-center gap-1">
                                Ver todos <span>↗</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {related.map(w => (
                                <WorkshopCard key={w.id} workshop={w} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
