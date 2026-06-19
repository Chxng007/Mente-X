export default function Card({ children, className = '' }) {
    return (
        <div className={`rounded-card bg-surface p-6 shadow-elevation-1 sm:p-8 ${className}`}>
            {children}
        </div>
    )
}