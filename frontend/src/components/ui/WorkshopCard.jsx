import { Link } from 'react-router-dom'

function formatPrice(price) {
    if (price === null || price === undefined) return 'Gratis'
    if (price === 0) return 'Gratis'
    return `$${Number(price).toLocaleString('es-CO')}`
}

function modalityLabel(modality) {
    const map = { VIRTUAL: 'Online', PRESENCIAL: 'Presencial', HYBRID: 'Híbrido' }
    return map[modality] ?? modality ?? ''
}

function modalityColor(modality) {
    const map = { VIRTUAL: 'bg-turquoise', PRESENCIAL: 'bg-coral', HYBRID: 'bg-sand text-text-primary' }
    return map[modality] ?? 'bg-bg-secondary text-text-secondary'
}

export default function WorkshopCard({ workshop }) {
    return (
        <Link
            to={`/talleres/${workshop.id}`}
            className="group block rounded-card bg-surface shadow-elevation-1 overflow-hidden hover:shadow-md transition-shadow"
        >
            {/* image */}
            <div className="relative h-44 bg-bg-secondary">
                {workshop.imageUrl && (
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
                )}
                {/* modality badge */}
                {workshop.modality && (
                    <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase ${modalityColor(workshop.modality)}`}>
                        {modalityLabel(workshop.modality)}
                    </span>
                )}
                {/* level badge */}
                {workshop.level && (
                    <span className="absolute top-2 left-24 bg-black/50 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {workshop.level}
                    </span>
                )}
                {/* price */}
                <span className="absolute top-2 right-2 bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {formatPrice(workshop.price)}
                </span>
            </div>

            {/* body */}
            <div className="p-4">
                <h3 className="font-bold text-text-primary text-sm leading-snug mb-1 group-hover:text-coral transition-colors line-clamp-2">
                    {workshop.title}
                </h3>

                {/* instructor */}
                {workshop.instructorName && (
                    <div className="flex items-center gap-2 mb-2">
                        {workshop.instructorAvatarUrl ? (
                            <img
                                src={workshop.instructorAvatarUrl}
                                alt={workshop.instructorName}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                {workshop.instructorName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span className="text-text-secondary text-xs">{workshop.instructorName}</span>
                    </div>
                )}

                <div className="flex flex-col gap-1 text-text-secondary text-xs mb-3">
                    {workshop.schedule && <span>🕐 {workshop.schedule}</span>}
                    {workshop.city && <span>📍 {workshop.city}</span>}
                    {workshop.danceStyle && (
                        <span className="text-turquoise font-medium">{workshop.danceStyle}</span>
                    )}
                </div>

                <span className="inline-block bg-coral text-white text-xs font-semibold px-3 py-1.5 rounded-btn hover:bg-coral-hover transition-colors">
                    Inscribirme
                </span>
            </div>
        </Link>
    )
}
