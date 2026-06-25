import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import MainLayout from '../components/layout/MainLayout'
import EventCard from '../components/ui/EventCard'
import WorkshopCard from '../components/ui/WorkshopCard'
import HistoryCard from '../components/ui/HistoryCard'
import { useFeaturedEvents, useEvents } from '../features/events/useEvents'
import { useWorkshops } from '../features/workshops/useWorkshops'
import { useFeaturedHistory } from '../features/history/useHistory'

function SkeletonCard({ tall = false }) {
    return (
        <div className={`rounded-card bg-bg-secondary animate-pulse ${tall ? 'h-64' : 'h-52'}`} />
    )
}

function SectionHeader({ title, linkTo, linkLabel = 'Ver todos →' }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-text-primary">{title}</h2>
            {linkTo && (
                <Link to={linkTo} className="text-sm font-semibold text-turquoise hover:underline">
                    {linkLabel}
                </Link>
            )}
        </div>
    )
}

function EmptyState({ message }) {
    return (
        <div className="col-span-full py-12 text-center">
            <p className="text-text-secondary text-sm">{message}</p>
        </div>
    )
}

export default function HomePage() {
    const { user } = useAuth()
    const displayName = user?.name ?? user?.email ?? 'Bailarín'

    const { data: featuredEvents = [], isLoading: loadingFeatured } = useFeaturedEvents()
    const { data: allWorkshops = [], isLoading: loadingWorkshops } = useWorkshops()
    const { data: featuredHistory = [], isLoading: loadingHistory } = useFeaturedHistory()

    // Split workshops into salsa/bachata vs urban styles
    const salsaWorkshops = allWorkshops.filter(w =>
        ['salsa', 'bachata'].some(s => w.danceStyle?.toLowerCase().includes(s))
    ).slice(0, 3)

    const urbanWorkshops = allWorkshops.filter(w =>
        ['hip hop', 'breaking', 'reggaeton', 'urbano'].some(s => w.danceStyle?.toLowerCase().includes(s))
    ).slice(0, 3)

    const otherWorkshops = allWorkshops.filter(w =>
        !['salsa', 'bachata', 'hip hop', 'breaking', 'reggaeton', 'urbano'].some(s =>
            w.danceStyle?.toLowerCase().includes(s)
        )
    ).slice(0, 3)

    const lastHistoryArticle = featuredHistory[0] ?? null

    return (
        <MainLayout>
            {/* ── HERO HEADER ── */}
            <section className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-coral mb-1">DanzApp</p>
                <h1 className="text-3xl font-black text-text-primary leading-tight">
                    ¡Hola, {displayName}!
                </h1>
                <p className="text-text-secondary mt-1">¿Qué ritmo movemos hoy?</p>
            </section>

            {/* ── BÚSQUEDA RÁPIDA ── */}
            <section className="mb-10 bg-surface rounded-card p-4 shadow-elevation-1 flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Busca clases, estilos o instructores..."
                    className="flex-1 border border-gray-200 rounded-btn px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-turquoise"
                />
                <div className="flex gap-2">
                    <button className="flex-1 sm:flex-none border border-turquoise text-turquoise text-sm font-semibold px-4 py-2.5 rounded-btn hover:bg-turquoise/10 transition-colors">
                        📍 Cerca de mí
                    </button>
                    <button className="flex-1 sm:flex-none border border-gray-300 text-text-secondary text-sm font-semibold px-4 py-2.5 rounded-btn hover:bg-bg-secondary transition-colors">
                        ⚙ Filtros
                    </button>
                </div>
            </section>

            {/* ── EVENTOS DESTACADOS ── */}
            <section className="mb-10">
                <SectionHeader title="Eventos Destacados" linkTo="/eventos" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loadingFeatured ? (
                        [0, 1].map(i => <SkeletonCard key={i} tall />)
                    ) : featuredEvents.length === 0 ? (
                        <EmptyState message="No hay eventos destacados aún. ¡Vuelve pronto!" />
                    ) : (
                        featuredEvents.slice(0, 2).map(event => (
                            <EventCard key={event.id} event={event} variant="featured" />
                        ))
                    )}
                </div>
            </section>

            {/* ── TALLERES POR GÉNERO ── */}
            <section className="mb-10">
                <SectionHeader title="Talleres por Género" linkTo="/talleres" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Salsa & Bachata */}
                    <div>
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wide mb-3">
                            🎵 Salsa &amp; Sabor
                        </h3>
                        {loadingWorkshops ? (
                            <div className="flex flex-col gap-3">
                                {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : salsaWorkshops.length === 0 ? (
                            <p className="text-text-secondary text-sm py-4">No hay talleres disponibles aún.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {salsaWorkshops.map(w => (
                                    <WorkshopCard key={w.id} workshop={w} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Urban */}
                    <div>
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wide mb-3">
                            🎤 Urbano
                        </h3>
                        {loadingWorkshops ? (
                            <div className="flex flex-col gap-3">
                                {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : urbanWorkshops.length === 0 ? (
                            <p className="text-text-secondary text-sm py-4">No hay talleres disponibles aún.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {urbanWorkshops.map(w => (
                                    <WorkshopCard key={w.id} workshop={w} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── OTROS TALLERES ── */}
            {(loadingWorkshops || otherWorkshops.length > 0) && (
                <section className="mb-10">
                    <SectionHeader title="Más Talleres" linkTo="/talleres" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loadingWorkshops ? (
                            [0, 1, 2].map(i => <SkeletonCard key={i} />)
                        ) : (
                            otherWorkshops.map(w => (
                                <WorkshopCard key={w.id} workshop={w} />
                            ))
                        )}
                    </div>
                </section>
            )}

            {/* ── RAÍCES QUE NOS MUEVEN ── */}
            <section className="mb-6">
                <SectionHeader title="Raíces que nos mueven" linkTo="/historia" />
                {loadingHistory ? (
                    <SkeletonCard tall />
                ) : lastHistoryArticle ? (
                    <div className="relative rounded-card overflow-hidden bg-[#1a0a2e] p-8 flex flex-col md:flex-row gap-6 items-center">
                        {lastHistoryArticle.imageUrl && (
                            <img
                                src={lastHistoryArticle.imageUrl}
                                alt={lastHistoryArticle.title}
                                className="w-full md:w-48 h-32 object-cover rounded-card flex-shrink-0"
                            />
                        )}
                        <div>
                            <span className="text-coral text-xs font-bold uppercase tracking-widest mb-1 block">
                                {lastHistoryArticle.danceStyle ?? 'Historia'}
                            </span>
                            <h3 className="text-white font-black text-xl mb-2">{lastHistoryArticle.title}</h3>
                            {lastHistoryArticle.subtitle && (
                                <p className="text-white/70 text-sm mb-4 line-clamp-2">{lastHistoryArticle.subtitle}</p>
                            )}
                            <Link
                                to={`/historia/${lastHistoryArticle.id}`}
                                className="inline-block bg-coral text-white text-sm font-semibold px-5 py-2 rounded-btn hover:bg-coral-hover transition-colors"
                            >
                                Leer artículo
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-card bg-[#1a0a2e] p-8 text-center">
                        <p className="text-white/60 text-sm">
                            Pronto encontrarás aquí historias sobre la danza colombiana.
                        </p>
                        <Link to="/historia" className="mt-4 inline-block text-coral text-sm font-semibold hover:underline">
                            Explorar Historia →
                        </Link>
                    </div>
                )}
            </section>
        </MainLayout>
    )
}
