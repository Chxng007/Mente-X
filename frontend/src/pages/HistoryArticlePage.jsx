import { useParams, Link } from 'react-router-dom'
import { useHistoryArticle, useHistory } from '../features/history/useHistory'
import HistoryCard from '../components/ui/HistoryCard'

function PlayIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="rgba(255,107,74,0.9)" />
            <polygon points="19,14 38,24 19,34" fill="white" />
        </svg>
    )
}

function SkeletonArticle() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
            <div className="h-8 bg-bg-secondary rounded w-2/3 mb-4" />
            <div className="h-4 bg-bg-secondary rounded w-1/2 mb-8" />
            <div className="h-4 bg-bg-secondary rounded w-full mb-3" />
            <div className="h-4 bg-bg-secondary rounded w-5/6 mb-3" />
            <div className="h-4 bg-bg-secondary rounded w-full mb-3" />
            <div className="h-4 bg-bg-secondary rounded w-4/5 mb-3" />
        </div>
    )
}

export default function HistoryArticlePage() {
    const { id } = useParams()
    const { data: article, isLoading, isError } = useHistoryArticle(id)
    const { data: allArticles = [] } = useHistory()

    const related = allArticles.filter(a => a.id !== Number(id)).slice(0, 3)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg-primary">
                <div className="w-full h-72 bg-bg-secondary animate-pulse mb-6" />
                <SkeletonArticle />
            </div>
        )
    }

    if (isError || !article) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-4">📖</p>
                    <p className="text-text-secondary text-lg mb-4">Artículo no encontrado.</p>
                    <Link to="/historia" className="text-coral font-semibold hover:underline">← Volver a Historia</Link>
                </div>
            </div>
        )
    }

    // Split content into paragraphs for rendering
    const paragraphs = article.content
        ? article.content.split('\n').filter(p => p.trim())
        : []

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* ── HERO ── */}
            <div className="relative w-full bg-bg-secondary overflow-hidden" style={{ minHeight: '340px' }}>
                {article.imageUrl && (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-80 object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {article.readTimeMin > 0 && (
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                📖 {article.readTimeMin} min de lectura
                            </span>
                        )}
                        {article.danceStyle && (
                            <span className="bg-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {article.danceStyle}
                            </span>
                        )}
                        {article.origin && (
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                📍 {article.origin}
                            </span>
                        )}
                    </div>
                    <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-2 max-w-2xl">
                        {article.title}
                    </h1>
                    {article.subtitle && (
                        <p className="text-white/75 text-sm md:text-base max-w-xl">{article.subtitle}</p>
                    )}
                </div>
            </div>

            {/* ── ARTICLE CONTENT ── */}
            <div className="max-w-3xl mx-auto px-4 py-12">
                {paragraphs.length > 0 ? (
                    paragraphs.map((para, i) => {
                        // treat lines starting with # as headings
                        if (para.startsWith('# ')) {
                            return (
                                <h2 key={i} className="text-coral font-black text-2xl mt-8 mb-3">
                                    {para.slice(2)}
                                </h2>
                            )
                        }
                        if (para.startsWith('## ')) {
                            return (
                                <h3 key={i} className="text-coral font-bold text-xl mt-6 mb-2">
                                    {para.slice(3)}
                                </h3>
                            )
                        }
                        if (para.startsWith('> ')) {
                            return (
                                <blockquote key={i} className="border-l-4 border-coral pl-4 my-6 italic text-text-secondary text-base">
                                    {para.slice(2)}
                                </blockquote>
                            )
                        }
                        return (
                            <p key={i} className="text-text-primary text-base leading-relaxed mb-4">
                                {para}
                            </p>
                        )
                    })
                ) : (
                    <p className="text-text-secondary text-sm">Contenido del artículo próximamente.</p>
                )}

                {/* Video embed section */}
                {article.videoUrl && (
                    <section className="mt-10 mb-6">
                        <h2 className="text-coral font-black text-2xl mb-4">Aprende los Pasos Básicos</h2>
                        <div className="relative rounded-card overflow-hidden bg-black aspect-video flex items-center justify-center">
                            <iframe
                                src={article.videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`Video: ${article.title}`}
                            />
                        </div>
                    </section>
                )}

                {!article.videoUrl && (
                    <section className="mt-10 mb-6">
                        <h2 className="text-coral font-black text-2xl mb-4">Aprende los Pasos Básicos</h2>
                        <div className="relative rounded-card overflow-hidden bg-[#1a0a2e] aspect-video flex flex-col items-center justify-center gap-3">
                            <PlayIcon />
                            <p className="text-white/60 text-sm">Video próximamente disponible</p>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="mt-10 bg-coral rounded-card p-8 text-center">
                    <p className="text-white font-black text-2xl mb-2">¿Sientes el ritmo?</p>
                    <p className="text-white/80 text-sm mb-6">
                        Únete a nuestra comunidad y aprende a bailar con los mejores instructores de Colombia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/talleres"
                            className="bg-white text-coral font-bold px-6 py-2.5 rounded-btn hover:bg-white/90 transition-colors"
                        >
                            Ver Talleres
                        </Link>
                        <Link
                            to="/eventos"
                            className="border border-white text-white font-bold px-6 py-2.5 rounded-btn hover:bg-white/10 transition-colors"
                        >
                            Explorar Eventos
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── RELATED ARTICLES ── */}
            {related.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-black text-text-primary mb-5">Más historias para explorar</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {related.map(a => (
                            <HistoryCard key={a.id} article={a} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
