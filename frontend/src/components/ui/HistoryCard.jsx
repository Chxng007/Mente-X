import { Link } from 'react-router-dom'

export default function HistoryCard({ article }) {
    return (
        <Link
            to={`/historia/${article.id}`}
            className="group relative flex flex-col rounded-card overflow-hidden bg-bg-secondary min-h-72 hover:shadow-md transition-shadow"
            style={article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* origin badge top-left */}
            {article.origin && (
                <span className="absolute top-3 left-3 z-10 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {article.origin}
                </span>
            )}

            {/* read time top-right */}
            {article.readTimeMin > 0 && (
                <span className="absolute top-3 right-3 z-10 bg-black/40 text-white/90 text-xs px-2 py-1 rounded-full">
                    📖 {article.readTimeMin} min
                </span>
            )}

            {/* content bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="text-white font-black text-base leading-tight mb-1 group-hover:text-sand transition-colors line-clamp-2">
                    {article.title}
                </h3>
                {article.subtitle && (
                    <p className="text-white/70 text-xs mb-3 line-clamp-2">{article.subtitle}</p>
                )}
                <span className="inline-block border border-coral text-coral text-xs font-semibold px-3 py-1.5 rounded-btn hover:bg-coral hover:text-white transition-colors">
                    Leer Historia
                </span>
            </div>
        </Link>
    )
}
