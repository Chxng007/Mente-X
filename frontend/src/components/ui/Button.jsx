import Spinner from './Spinner'

const VARIANTS = {
    primary:
        'bg-coral text-white hover:bg-coral-hover focus-visible:ring-coral disabled:bg-coral/50',
    secondary:
        'bg-transparent text-turquoise border border-turquoise hover:bg-turquoise/10 focus-visible:ring-turquoise disabled:opacity-50',
    ghost:
        'bg-transparent text-text-secondary hover:bg-bg-secondary focus-visible:ring-text-secondary disabled:opacity-50',
}

export default function Button({
    children,
    variant = 'primary',
    type = 'button',
    isLoading = false,
    disabled = false,
    fullWidth = true,
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {isLoading && <Spinner size="sm" />}
            {children}
        </button>
    )
}