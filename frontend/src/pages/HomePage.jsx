import { Link } from 'react-router-dom'
import { Search, MapPin, SlidersHorizontal, Mic, Play, Bookmark } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import MainLayout from '../components/layout/MainLayout'
import EventCard from '../components/ui/EventCard'
import WorkshopListRow from '../components/ui/WorkshopListRow'
import UrbanCard from '../components/ui/UrbanCard'
import { useFeaturedEvents } from '../features/events/useEvents'
import { useWorkshops } from '../features/workshops/useWorkshops'
import { useFeaturedHistory } from '../features/history/useHistory'

function SkeletonCard({ tall = false }) {
    return (
        <div className={`rounded-card bg-bg-secondary animate-pulse ${tall ? 'h-64' : 'h-20'}`} />
    )
}

function SectionHeader({ title, linkTo, linkLabel = 'Ver todos', bar }) {
    const barColor = { coral: 'bg-coral', turquoise: 'bg-turquoise', sand: 'bg-sand' }[bar]
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2.5 text-xl font-black text-text-primary">
                {bar && <span className={`w-1.5 h-6 rounded-full ${barColor}`} />}
                {title}
            </h2>
            {linkTo && (
                <Link to={linkTo} className="text-sm font-semibold text-turquoise hover:underline">
                    {linkLabel}
                </Link>
            )}
        </div>
    )
}

function matchesAny(style, keywords) {
    return keywords.some((k) => style?.toLowerCase().includes(k))
}

export default function HomePage() {
    const { user } = useAuth()
    const displayName = user?.name ?? user?.email ?? 'Bailarín'

    const { data: featuredEvents = [], isLoading: loadingFeatured } = useFeaturedEvents()
    const { data: allWorkshops = [], isLoading: loadingWorkshops } = useWorkshops()
    const { data: featuredHistory = [], isLoading: loadingHistory } = useFeaturedHistory()

    const salsaWorkshops = allWorkshops
        .filter((w) => matchesAny(w.danceStyle, ['salsa', 'bachata', 'sabor']))
        .slice(0, 4)

    const champetaWorkshops = allWorkshops
        .filter((w) => matchesAny(w.danceStyle, ['champeta', 'flow', 'afro']))
        .slice(0, 4)

    const urbanWorkshops = allWorkshops
        .filter((w) => matchesAny(w.danceStyle, ['hip hop', 'hip-hop', 'breaking', 'reggaeton', 'urbano']))
        .slice(0, 3)

    const lastHistoryArticle = featuredHistory[0] ?? null

    return (
        <MainLayout>
            {/* ── HERO HEADER ── */}
            <section className="mb-6">
                <h1 className="text-3xl font-black text-text-primary leading-tight">
                    ¡Hola, {displayName}!
                </h1>
                <p className="text-text-secondary mt-1">¿Qué ritmo movemos hoy?</p>
            </section>

            {/* ── BÚSQUEDA RÁPIDA ── */}
            <section className="mb-10 bg-surface rounded-card p-4 shadow-elevation-1 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
                    />
                    <input
                        type="text"
                        placeholder="Busca clases, estilos o instructores..."
                        className="w-full border border-gray-200 rounded-btn pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-turquoise"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-300 text-text-secondary text-sm font-semibold px-4 py-2.5 rounded-btn hover:bg-bg-secondary transition-colors">
                        <MapPin size={16} /> Cerca de mí
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-300 text-text-secondary text-sm font-semibold px-4 py-2.5 rounded-btn hover:bg-bg-secondary transition-colors">
                        <SlidersHorizontal size={16} /> Filtros
                    </button>
                </div>
            </section>

            {/* ── EVENTOS DESTACADOS ── */}
            <section className="mb-10">
                <SectionHeader title="Eventos Destacados" linkTo="/eventos" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loadingFeatured ? (
                        [0, 1].map((i) => <SkeletonCard key={i} tall />)
                    ) : featuredEvents.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-text-secondary text-sm">
                                No hay eventos destacados aún. ¡Vuelve pronto!
                            </p>
                        </div>
                    ) : (
                        featuredEvents.slice(0, 2).map((event) => (
                            <EventCard key={event.id} event={event} variant="featured" />
                        ))
                    )}
                </div>
            </section>

            {/* ── TALLERES POR GÉNERO (2 columnas) ── */}
            <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Salsa & Sabor */}
                <div>
                    {/* Genre banner */}
                    <div
                        className="relative rounded-card overflow-hidden h-28 mb-4"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547153760-18fc86324498?w=800)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-end p-4">
                            <div>
                                <span className="block text-[10px] font-bold text-coral uppercase tracking-widest mb-0.5">Talleres</span>
                                <h2 className="text-white font-black text-xl leading-tight">Salsa & Sabor</h2>
                            </div>
                        </div>
                    </div>
                    {loadingWorkshops ? (
                        <div className="flex flex-col gap-3">
                            {[0, 1].map((i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : salsaWorkshops.length === 0 ? (
                        <p className="text-text-secondary text-sm py-4">No hay talleres disponibles aún.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {salsaWorkshops.map((w) => (
                                <WorkshopListRow key={w.id} workshop={w} accent="turquoise" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Champeta & Flow */}
                <div>
                    {/* Genre banner */}
                    <div
                        className="relative rounded-card overflow-hidden h-28 mb-4"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-end p-4">
                            <div>
                                <span className="block text-[10px] font-bold text-turquoise uppercase tracking-widest mb-0.5">Talleres</span>
                                <h2 className="text-white font-black text-xl leading-tight">Champeta & Flow</h2>
                            </div>
                        </div>
                    </div>
                    {loadingWorkshops ? (
                        <div className="flex flex-col gap-3">
                            {[0, 1].map((i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : champetaWorkshops.length === 0 ? (
                        <p className="text-text-secondary text-sm py-4">No hay talleres disponibles aún.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {champetaWorkshops.map((w) => (
                                <WorkshopListRow key={w.id} workshop={w} accent="turquoise" />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── URBANO ── */}
            {(loadingWorkshops || urbanWorkshops.length > 0) && (
                <section className="mb-10">
                    {/* Urbano banner */}
                    <div
                        className="relative rounded-card overflow-hidden h-28 mb-4"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-end justify-between p-4">
                            <div>
                                <span className="block text-[10px] font-bold text-sand uppercase tracking-widest mb-0.5">Talleres</span>
                                <h2 className="text-white font-black text-xl leading-tight">Urbano</h2>
                            </div>
                            <a href="/talleres" className="text-white/70 text-xs font-semibold hover:text-white transition-colors">
                                Ver todos ↗
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loadingWorkshops
                            ? [0, 1, 2].map((i) => <SkeletonCard key={i} tall />)
                            : urbanWorkshops.map((w) => <UrbanCard key={w.id} workshop={w} />)}
                    </div>
                </section>
            )}

            {/* ── RAÍCES QUE NOS MUEVEN ── */}
            <section className="mb-6">
                <SectionHeader title="Raíces que nos mueven" linkTo="/historia" />
                {loadingHistory ? (
                    <SkeletonCard tall />
                ) : (
                    <div className="relative overflow-hidden rounded-card bg-coral text-white">
                        {lastHistoryArticle?.imageUrl && (
                            <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block">
                                <img
                                    src={lastHistoryArticle.imageUrl}
                                    alt={lastHistoryArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-coral via-coral/80 to-coral/40" />
                            </div>
                        )}

                        <div className="relative p-8 md:w-3/5">
                            <div className="flex items-center gap-2 mb-3">
                                <Mic size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    Nuevo Podcast
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                                {lastHistoryArticle?.title ?? 'La Historia de la Salsa Caleña'}
                            </h3>
                            <p className="text-white/85 text-sm mb-6 max-w-md">
                                {lastHistoryArticle?.subtitle ??
                                    'Explora cómo Cali se convirtió en la capital mundial de la salsa y el impacto social del ritmo en las comunidades.'}
                            </p>
                            <div className="flex items-center gap-3">
                                <Link
                                    to={lastHistoryArticle ? `/historia/${lastHistoryArticle.id}` : '/historia'}
                                    className="inline-flex items-center gap-2 bg-white text-coral text-sm font-bold px-5 py-2.5 rounded-btn hover:bg-white/90 transition-colors"
                                >
                                    <Play size={16} fill="currentColor" /> Escuchar Ahora
                                </Link>
                                <button
                                    className="w-11 h-11 flex items-center justify-center rounded-btn border border-white/40 hover:bg-white/10 transition-colors"
                                    aria-label="Guardar"
                                >
                                    <Bookmark size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </MainLayout>
    )
}