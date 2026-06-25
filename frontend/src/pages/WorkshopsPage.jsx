import { useState } from 'react'
import { useWorkshops } from '../features/workshops/useWorkshops'
import WorkshopCard from '../components/ui/WorkshopCard'

const STYLES = ['Todos', 'Salsa', 'Bachata', 'Champeta', 'Hip Hop', 'Breaking', 'Reggaeton', 'Cumbia', 'Vallenato']
const LEVELS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado']

function SkeletonCard() {
    return <div className="rounded-card bg-bg-secondary animate-pulse h-56" />
}

export default function WorkshopsPage() {
    const [selectedStyle, setSelectedStyle] = useState('Todos')
    const [selectedLevel, setSelectedLevel] = useState('Todos')
    const [selectedFormat, setSelectedFormat] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [visibleCount, setVisibleCount] = useState(6)

    const { data: workshops = [], isLoading, isError } = useWorkshops()

    const filtered = workshops.filter(w => {
        const matchStyle =
            selectedStyle === 'Todos' ||
            w.danceStyle?.toLowerCase().includes(selectedStyle.toLowerCase())
        const matchLevel =
            selectedLevel === 'Todos' ||
            w.level?.toLowerCase() === selectedLevel.toLowerCase()
        const matchFormat =
            !selectedFormat || w.modality === selectedFormat
        const matchPrice =
            !maxPrice || (w.price ?? 0) <= Number(maxPrice)
        return matchStyle && matchLevel && matchFormat && matchPrice
    })

    const visible = filtered.slice(0, visibleCount)

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div className="relative bg-[#1a0a2e] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-turquoise/10" />
                <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-black text-white mb-3">
                        Perfecciona tu <span className="text-coral">ritmo</span>
                    </h1>
                    <p className="text-white/70 mb-8 max-w-lg mx-auto">
                        Talleres presenciales y online con los mejores instructores de Colombia.
                    </p>
                    <button className="bg-coral text-white font-semibold px-8 py-3 rounded-btn hover:bg-coral-hover transition-colors">
                        Explorar Clases
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ── SIDEBAR FILTERS ── */}
                    <aside className="lg:w-56 flex-shrink-0">
                        <div className="bg-surface rounded-card shadow-elevation-1 p-5 flex flex-col gap-5 sticky top-24">
                            <h3 className="font-bold text-text-primary text-sm uppercase tracking-wide">Filtros</h3>

                            {/* Style chips */}
                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-2 block">Estilo de Danza</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {STYLES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedStyle(s)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                                                selectedStyle === s
                                                    ? 'bg-turquoise text-white border-turquoise'
                                                    : 'border-gray-300 text-text-secondary hover:border-turquoise'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Level chips */}
                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-2 block">Nivel</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {LEVELS.map(l => (
                                        <button
                                            key={l}
                                            onClick={() => setSelectedLevel(l)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                                                selectedLevel === l
                                                    ? 'bg-coral text-white border-coral'
                                                    : 'border-gray-300 text-text-secondary hover:border-coral'
                                            }`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Format */}
                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-1 block">Formato</label>
                                <select
                                    value={selectedFormat}
                                    onChange={e => setSelectedFormat(e.target.value)}
                                    className="w-full border border-gray-200 rounded-btn px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
                                >
                                    <option value="">Todos los formatos</option>
                                    <option value="PRESENCIAL">Presencial</option>
                                    <option value="VIRTUAL">Virtual / Online</option>
                                    <option value="HYBRID">Híbrido</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="text-xs font-semibold text-text-secondary mb-1 block">
                                    Precio máximo: {maxPrice ? `$${Number(maxPrice).toLocaleString('es-CO')}` : 'Sin límite'}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500000"
                                    step="10000"
                                    value={maxPrice || 500000}
                                    onChange={e => setMaxPrice(e.target.value === '500000' ? '' : e.target.value)}
                                    className="w-full accent-coral"
                                />
                            </div>

                            <button
                                onClick={() => { setSelectedStyle('Todos'); setSelectedLevel('Todos'); setSelectedFormat(''); setMaxPrice('') }}
                                className="text-xs text-text-secondary hover:text-coral transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>

                    {/* ── WORKSHOP GRID ── */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-text-primary font-bold">
                                Próximos Talleres
                                {!isLoading && <span className="text-text-secondary font-normal ml-1">({filtered.length})</span>}
                            </p>
                            <select className="border border-gray-200 rounded-btn px-3 py-1.5 text-sm text-text-secondary focus:outline-none">
                                <option>Más recientes</option>
                                <option>Precio: menor a mayor</option>
                                <option>Precio: mayor a menor</option>
                            </select>
                        </div>

                        {isError ? (
                            <div className="text-center py-16">
                                <p className="text-text-secondary">No se pudieron cargar los talleres. Intenta de nuevo.</p>
                            </div>
                        ) : isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : visible.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-4xl mb-3">💃</p>
                                <p className="text-text-secondary">No hay talleres disponibles con estos filtros.</p>
                                <p className="text-text-secondary text-sm mt-1">Prueba con diferentes estilos o niveles.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {visible.map(w => (
                                        <WorkshopCard key={w.id} workshop={w} />
                                    ))}
                                </div>
                                {visibleCount < filtered.length && (
                                    <div className="text-center mt-8">
                                        <button
                                            onClick={() => setVisibleCount(c => c + 6)}
                                            className="border border-turquoise text-turquoise font-semibold px-8 py-2.5 rounded-btn hover:bg-turquoise/10 transition-colors"
                                        >
                                            Cargar más talleres
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* ── PREMIUM EXPERIENCE ── */}
                <section className="mt-16 bg-[#1a0a2e] rounded-card p-8">
                    <h2 className="text-white font-black text-2xl mb-2 text-center">Premium Experience</h2>
                    <p className="text-white/60 text-sm text-center mb-8">
                        Aprende con instructores de clase mundial
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { name: 'Carlos Méndez', country: '🇨🇴 Colombia', desc: 'Campeón nacional de Salsa Cali, 10 años de experiencia internacional.' },
                            { name: 'Valeria Torres', country: '🇨🇴 Colombia', desc: 'Maestra de Cumbia y Porro, embajadora cultural de la costa Caribe.' },
                            { name: 'Andrés Ospina', country: '🇨🇴 Colombia', desc: 'Pionero del Breaking colombiano y fundador de la escuela UrbanMov.' },
                        ].map(inst => (
                            <div key={inst.name} className="bg-white/5 border border-white/10 rounded-card p-5 text-center">
                                <div className="w-16 h-16 rounded-full bg-coral/30 text-coral font-black text-xl flex items-center justify-center mx-auto mb-3">
                                    {inst.name.charAt(0)}
                                </div>
                                <p className="text-white/50 text-xs mb-1">{inst.country}</p>
                                <h3 className="text-white font-bold mb-2">{inst.name}</h3>
                                <p className="text-white/60 text-xs mb-4 leading-relaxed">{inst.desc}</p>
                                <button className="border border-coral text-coral text-xs font-semibold px-4 py-1.5 rounded-btn hover:bg-coral hover:text-white transition-colors">
                                    Inscribirse
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
