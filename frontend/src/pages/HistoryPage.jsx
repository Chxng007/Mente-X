import { useState } from 'react'
import { useHistory, useFeaturedHistory } from '../features/history/useHistory'
import HistoryCard from '../components/ui/HistoryCard'

function SkeletonCard({ tall = false }) {
    return <div className={`rounded-card bg-bg-secondary animate-pulse ${tall ? 'h-72' : 'h-56'}`} />
}

const TIMELINE = [
    {
        label: 'Orígenes Ancestrales',
        color: 'text-coral',
        number: '01',
        desc: 'Las danzas de los pueblos indígenas y las tradiciones africanas que llegaron con el mestizaje forjaron las bases rítmicas de Colombia.',
        points: ['Rituales chamánicos', 'Herencia bantú y yoruba', 'Danzas ceremoniales indígenas'],
    },
    {
        label: 'Evolución Urbana',
        color: 'text-turquoise',
        number: '02',
        desc: 'El siglo XX trajo la migración y la fusión. La Cumbia y la Salsa Caleña emergieron como expresiones de identidad en las ciudades.',
        points: ['Auge de la Cumbia en la Costa', 'Salsa Cali como fenómeno social', 'El Vallenato y el acordeón'],
    },
    {
        label: 'Fusión Contemporánea',
        color: 'text-sand',
        number: '03',
        desc: 'Hoy, el reggaeton, el hip hop y los géneros urbanos se mezclan con las raíces para crear nuevas expresiones que conquistan el mundo.',
        points: ['Champeta y resistencia cultural', 'Breaking y cultura urbana', 'Fusión global con identidad local'],
    },
]

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const { data: featured = [], isLoading: loadingFeatured } = useFeaturedHistory()
    const { data: allArticles = [], isLoading: loadingAll } = useHistory()

    const filtered = allArticles.filter(a =>
        !searchQuery ||
        a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.danceStyle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.origin?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div className="relative bg-[#0f0720] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/10 to-turquoise/5" />
                <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
                    <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                        Nuestra Herencia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                        Nuestra Herencia en{' '}
                        <span className="text-coral">Movimiento</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                        Descubre las raíces profundas de la danza colombiana: de los rituales ancestrales a los escenarios del mundo.
                    </p>
                    <div className="flex gap-3 max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Busca un estilo o historia..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral"
                        />
                        <button className="bg-coral text-white font-semibold px-5 py-2.5 rounded-btn hover:bg-coral-hover transition-colors">
                            Explorar
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* ── HISTORIAS DESTACADAS ── */}
                <section className="mb-14">
                    <h2 className="text-2xl font-black text-text-primary mb-6">Historias Destacadas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {loadingFeatured ? (
                            [0, 1].map(i => <SkeletonCard key={i} tall />)
                        ) : featured.length === 0 ? (
                            <div className="col-span-2 text-center py-10">
                                <p className="text-text-secondary text-sm">No hay historias destacadas aún.</p>
                            </div>
                        ) : (
                            featured.slice(0, 2).map(a => (
                                <HistoryCard key={a.id} article={a} />
                            ))
                        )}
                    </div>
                </section>

                {/* ── CRONOLOGÍA DE RITMOS ── */}
                <section className="mb-14">
                    <h2 className="text-2xl font-black text-text-primary mb-2">Cronología de Ritmos</h2>
                    <p className="text-text-secondary text-sm mb-8">Un viaje por las eras de la danza colombiana</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {TIMELINE.map(item => (
                            <div key={item.number} className="bg-surface rounded-card shadow-elevation-1 p-6">
                                <p className={`text-4xl font-black mb-2 ${item.color}`}>{item.number}</p>
                                <h3 className={`font-black text-lg mb-3 ${item.color}`}>{item.label}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-4">{item.desc}</p>
                                <ul className="flex flex-col gap-1.5">
                                    {item.points.map(p => (
                                        <li key={p} className="text-xs text-text-secondary flex items-start gap-2">
                                            <span className={`mt-0.5 font-bold ${item.color}`}>•</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EXPLORAR HISTORIAS ── */}
                <section>
                    <h2 className="text-2xl font-black text-text-primary mb-6">
                        Explorar Historias
                        {!loadingAll && filtered.length > 0 && (
                            <span className="text-text-secondary font-normal text-base ml-2">({filtered.length})</span>
                        )}
                    </h2>
                    {loadingAll ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[0, 1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-4xl mb-3">📖</p>
                            <p className="text-text-secondary">
                                {searchQuery
                                    ? `No hay historias sobre "${searchQuery}".`
                                    : 'Las historias llegarán pronto. ¡Vuelve pronto!'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map(a => (
                                <HistoryCard key={a.id} article={a} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
