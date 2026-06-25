import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useWorkshop, useWorkshops } from '../features/workshops/useWorkshops'
import WorkshopCard from '../components/ui/WorkshopCard'

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')} COP`
}

function modalityLabel(modality) {
    const map = { VIRTUAL: 'Online', PRESENCIAL: 'Presencial', HYBRID: 'Híbrido' }
    return map[modality] ?? modality ?? ''
}

const LEARNINGS = [
    'Técnica de pasos básicos y avanzados',
    'Musicalidad y ritmo corporal',
    'Figuras y combinaciones coreográficas',
    'Historia y cultura del estilo',
]

function AccordionItem({ title, content, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="border border-gray-200 rounded-card overflow-hidden mb-2">
            <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-text-primary hover:bg-bg-secondary transition-colors"
                onClick={() => setOpen(v => !v)}
            >
                {title}
                <span className="text-text-secondary">{open ? '▲' : '▼'}</span>
            </button>
            {open && (
                <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">
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

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div
                className="relative bg-bg-secondary overflow-hidden"
                style={{ minHeight: '300px' }}
            >
                {workshop.imageUrl && (
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-72 object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {workshop.level && (
                            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                                🎯 {workshop.level}
                            </span>
                        )}
                        {workshop.modality && (
                            <span className="bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {modalityLabel(workshop.modality)}
                            </span>
                        )}
                    </div>
                    <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4 max-w-2xl">
                        {workshop.title}
                    </h1>
                    <button className="bg-coral text-white font-semibold px-6 py-2.5 rounded-btn hover:bg-coral-hover transition-colors">
                        Inscribirme Ahora
                    </button>
                </div>
            </div>

            {/* ── INFO BAR ── */}
            <div className="bg-surface border-b border-gray-100 shadow-elevation-1">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-4">
                    {workshop.schedule && (
                        <span className="flex items-center gap-2 text-sm text-text-primary font-medium bg-bg-secondary px-4 py-2 rounded-full">
                            🕐 {workshop.schedule}
                        </span>
                    )}
                    <span className="flex items-center gap-2 text-sm text-white font-medium bg-coral px-4 py-2 rounded-full">
                        💰 {formatPrice(workshop.price)}
                    </span>
                    {workshop.capacity && (
                        <span className="flex items-center gap-2 text-sm text-text-primary font-medium bg-bg-secondary px-4 py-2 rounded-full">
                            👥 {workshop.capacity} cupos
                        </span>
                    )}
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column */}
                    <div className="flex-1">
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
                                {LEARNINGS.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-bg-secondary rounded-card p-3">
                                        <span className="text-turquoise font-bold mt-0.5">✓</span>
                                        <span className="text-text-primary text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Programa del taller */}
                        <section className="mb-8">
                            <h2 className="text-xl font-black text-text-primary mb-4">Programa del Taller</h2>
                            <AccordionItem
                                title="Semana 1 — Fundamentos y base rítmica"
                                content="Introducción a los pasos básicos, postura corporal, musicalidad y conexión con la pareja."
                                defaultOpen
                            />
                            <AccordionItem
                                title="Semana 2 — Figuras y combinaciones"
                                content="Aprenderás figuras intermedias, giros y combinaciones fluidas con la música."
                            />
                            <AccordionItem
                                title="Semana 3 — Estilo y expresión"
                                content="Desarrolla tu propio estilo, footwork avanzado y expresión corporal."
                            />
                            <AccordionItem
                                title="Semana 4 — Coreografía final"
                                content="Montaje de una coreografía completa para presentar en la clase de clausura."
                            />
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="lg:w-80 flex-shrink-0 flex flex-col gap-5">
                        {/* Location */}
                        <div className="bg-surface rounded-card shadow-elevation-1 overflow-hidden">
                            <div className="h-36 bg-bg-secondary flex items-center justify-center text-text-secondary text-sm">
                                📍 Mapa no disponible aún
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-text-primary text-sm mb-1">Ubicación</h3>
                                {workshop.address && (
                                    <p className="text-text-secondary text-xs">{workshop.address}</p>
                                )}
                                {workshop.city && (
                                    <p className="text-text-secondary text-xs">{workshop.city}, Colombia</p>
                                )}
                                {!workshop.address && !workshop.city && (
                                    <p className="text-text-secondary text-xs">
                                        {modalityLabel(workshop.modality) ?? 'Por confirmar'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Price CTA */}
                        <div className="bg-coral rounded-card p-5 text-white">
                            <p className="font-black text-2xl mb-1">{formatPrice(workshop.price)}</p>
                            <p className="text-white/80 text-xs mb-4">inversión total del taller</p>
                            <ul className="text-sm text-white/90 mb-5 flex flex-col gap-1.5">
                                {workshop.capacity && <li>✓ Cupo: {workshop.capacity} estudiantes</li>}
                                {workshop.level && <li>✓ Nivel: {workshop.level}</li>}
                                {workshop.danceStyle && <li>✓ Estilo: {workshop.danceStyle}</li>}
                                <li>✓ Material de apoyo incluido</li>
                                <li>✓ Certificado al finalizar</li>
                            </ul>
                            <button className="w-full bg-white text-coral font-black text-sm py-3 rounded-btn hover:bg-white/90 transition-colors">
                                RESERVAR MI LUGAR
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── INSTRUCTOR ── */}
                {workshop.instructorName && (
                    <section className="mt-12 bg-surface rounded-card shadow-elevation-1 p-6">
                        <h2 className="text-xl font-black text-text-primary mb-5">Tu Instructor/a</h2>
                        <div className="flex items-start gap-5">
                            {workshop.instructorAvatarUrl ? (
                                <img
                                    src={workshop.instructorAvatarUrl}
                                    alt={workshop.instructorName}
                                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-coral text-white text-2xl font-black flex items-center justify-center flex-shrink-0">
                                    {workshop.instructorName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="font-black text-text-primary text-lg">{workshop.instructorName}</h3>
                                {workshop.instructorTitle && (
                                    <p className="text-turquoise text-sm font-semibold mb-2">{workshop.instructorTitle}</p>
                                )}
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Instructor/a con amplia experiencia en la enseñanza de la danza colombiana.
                                    Su pasión por compartir el arte y la cultura hace de cada clase una experiencia única.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── RELATED WORKSHOPS ── */}
                {related.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-black text-text-primary mb-5">
                            Talleres que podrían interesarte
                        </h2>
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
