import { Link } from 'react-router-dom'

const STYLE_COLOR = {
    'hip hop':  { bg: 'bg-turquoise', label: 'HIP HOP' },
    'hip-hop':  { bg: 'bg-turquoise', label: 'HIP HOP' },
    'breaking': { bg: 'bg-sand',      label: 'BREAKING' },
    'reggaeton':{ bg: 'bg-coral',     label: 'REGGAETON' },
    'urbano':   { bg: 'bg-coral',     label: 'URBANO' },
}

function styleBadge(danceStyle) {
    const key = danceStyle?.toLowerCase() ?? ''
    return STYLE_COLOR[key] ?? { bg: 'bg-white/20', label: danceStyle?.toUpperCase() ?? '' }
}

export default function UrbanCard({ workshop }) {
    const badge = styleBadge(workshop.danceStyle)

    return (
        <Link
            to={`/talleres/${workshop.id}`}
            className="group relative block rounded-card overflow-hidden min-h-56 bg-bg-secondary"
            style={
                workshop.imageUrl
                    ? { backgroundImage: `url(${workshop.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : {}
            }
        >
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

            {/* dance style badge - top left */}
            {workshop.danceStyle && (
                <span className={`absolute top-3 left-3 z-10 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${badge.bg}`}>
                    {badge.label}
                </span>
            )}

            {/* content - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h4 className="text-white font-black text-base leading-snug mb-1 group-hover:text-sand transition-colors line-clamp-2">
                    {workshop.title}
                </h4>
                {workshop.instructorName && (
                    <p className="text-white/70 text-xs mb-3">Por: {workshop.instructorName}</p>
                )}
                <span className="inline-block bg-white text-text-primary text-xs font-bold px-4 py-2 rounded-btn group-hover:bg-sand transition-colors">
                    Reservar Cupo →
                </span>
            </div>
        </Link>
    )
}
