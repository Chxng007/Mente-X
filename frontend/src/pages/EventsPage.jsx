import { useState } from 'react'
import { useEvents } from '../features/events/useEvents'
import EventCard from '../components/ui/EventCard'

const CATEGORIES = ['Todos', 'Festival', 'Concert', 'Social', 'Competition', 'Online']

function SkeletonCard() {
    return <div className="rounded-card bg-bg-secondary animate-pulse h-52" />
}

export default function EventsPage() {
    const [search, setSearch] = useState({ city: '', level: '' })
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const [filters, setFilters] = useState({ city: '', level: '', maxPrice: '' })

    const { data: events = [], isLoading, isError } = useEvents()

    const filtered = events.filter(e => {
        const matchCategory =
            selectedCategory === 'Todos' ||
            e.category?.toLowerCase() === selectedCategory.toLowerCase()
        const matchCity = !filters.city || e.city?.toLowerCase().includes(filters.city.toLowerCase())
        const matchLevel = !filters.level || e.level?.toLowerCase() === filters.level.toLowerCase()
        const matchPrice = !filters.maxPrice || (e.price ?? 0) <= Number(filters.maxPrice)
        return matchCategory && matchCity && matchLevel && matchPrice
    })

    const featured = filtered.filter(e => e.featured).slice(0, 2)
    const rest = filtered.filter(e => !e.featured)

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO BANNER ── */}
            <section className="bg-bg-secondary rounded-card mx-4 mt-6 p-8 mb-8">
                <h1 className="text-3xl font-black text-text-primary mb-1">
                    Encuentra tu próximo <span className="text-coral">ritmo</span>
                </h1>
                <p className="text-text-secondary text-sm mb-6">
                    Descubre festivales, conciertos y eventos de danza en toda Colombia.
                </p>

                {/* inline search filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="📍 Ubicación"
                        value={search.city}
                        onChange={e => setSearch(s => ({ ...s, city: e.target.value }))}
                        className="flex-1 border border-gray-200 bg-surface rounded-btn px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-turquoise"
                    />
                    <select
                        className="flex-1 border border-gray-200 bg-surface rounded-btn px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-turquoise"
                        value={search.level}
                        onChange={e => setSearch(s => ({ ...s, level: e.target.value }))}
                    >
                        <option value="">Género / Nivel</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                        <option value="Todos">Todos los niveles</option>
                    </select>
                    <button
                        onClick={() => setFilters({ ...search, maxPrice: filters.maxPrice })}
                        className="bg-coral text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-coral-hover transition-colors"
                    >
                        Buscar
                    </button>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4">
                {/* ── CATEGORY CHIPS ── */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                                selectedCategory === cat
                                    ? 'bg-turquoise text-white border-turquoise'
                                    : 'border-gray-300 text-text-secondary hover:border-turquoise hover:text-turquoise'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── FEATURED EVENTS ── */}
                {(isLoading || featured.length > 0) && (
                    <section className="mb-10">
                        <h2 className="text-xl font-black text-text-primary mb-4">Eventos Destacados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {isLoading ? (
                                [0, 1].map(i => <SkeletonCard key={i} />)
                            ) : (
                                featured.map(e => <EventCard key={e.id} event={e} variant="featured" />)
                            )}
                        </div>
                    </section>
                )}

                {/* ── MAIN CONTENT: sidebar + grid ── */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar filters */}
                    <aside className="lg:w-56 flex-shrink-0">
                        <div className="bg-surface rounded-card shadow-elevation-1 p-5 flex flex-col gap-5 sticky top-24">
                            <h3 className="font-bold text-text-primary text-sm uppercase tracking-wide">Filtros</h3>

                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-1 block">Ciudad</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Bogotá"
                                    value={filters.city}
                                    onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-btn px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-1 block">Nivel</label>
                                {['', 'Principiante', 'Intermedio', 'Avanzado', 'Todos'].map(lvl => (
                                    <label key={lvl} className="flex items-center gap-2 cursor-pointer mb-1">
                                        <input
                                            type="radio"
                                            name="level"
                                            value={lvl}
                                            checked={filters.level === lvl}
                                            onChange={() => setFilters(f => ({ ...f, level: lvl }))}
                                            className="accent-turquoise"
                                        />
                                        <span className="text-sm text-text-primary">{lvl || 'Cualquier nivel'}</span>
                                    </label>
                                ))}
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-1 block">
                                    Precio máximo: {filters.maxPrice ? `$${Number(filters.maxPrice).toLocaleString('es-CO')}` : 'Sin límite'}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500000"
                                    step="10000"
                                    value={filters.maxPrice || 500000}
                                    onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value === '500000' ? '' : e.target.value }))}
                                    className="w-full accent-coral"
                                />
                            </div>

                            <button
                                onClick={() => setFilters({ city: '', level: '', maxPrice: '' })}
                                className="text-xs text-text-secondary hover:text-coral transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>

                    {/* Event grid */}
                    <div className="flex-1">
                        {isError ? (
                            <div className="text-center py-16">
                                <p className="text-text-secondary">No se pudieron cargar los eventos. Intenta de nuevo.</p>
                            </div>
                        ) : isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : rest.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-4xl mb-3">💃</p>
                                <p className="text-text-secondary">No hay eventos disponibles aún.</p>
                                <p className="text-text-secondary text-sm mt-1">¡Pronto habrá nuevos eventos para ti!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {rest.map(e => <EventCard key={e.id} event={e} variant="compact" />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
