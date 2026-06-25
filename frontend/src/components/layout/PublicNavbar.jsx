import { Link } from 'react-router-dom'

export default function PublicNavbar() {
    return (
        <header className="flex items-center justify-between px-6 py-6 sm:px-12">
            <Link to="/" className="flex items-center gap-2">
                <span className="text-coral" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" />
                    </svg>
                </span>
                <span className="text-lg font-black text-coral">DanzApp</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-semibold text-text-secondary">
                <Link to="/talleres" className="hover:text-text-primary">Talleres</Link>
                <Link to="/eventos" className="hover:text-text-primary">Eventos</Link>
            </nav>
        </header>
    )
}