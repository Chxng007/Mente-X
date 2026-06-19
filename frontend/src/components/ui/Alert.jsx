const VARIANTS = {
    error: 'bg-error/10 text-error border-error/20',
    success: 'bg-success/10 text-success border-success/20',
    info: 'bg-info/10 text-info border-info/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
}

export default function Alert({ variant = 'info', children, className = '' }) {
    if (!children) return null

    return (
        <div role="alert" className={`rounded-input border px-4 py-3 text-sm font-medium ${VARIANTS[variant]} ${className}`}>
            {children}
        </div>
    )
}