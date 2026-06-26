import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAuth } from '../../context/useAuth'

const NAV_LINKS = [
    { to: '/inicio', label: 'Inicio' },
    { to: '/eventos', label: 'Eventos' },
    { to: '/talleres', label: 'Talleres' },
    { to: '/historia', label: 'Historia' },
    { to: '/perfil', label: 'Perfil' },
]

function BellIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    )
}

function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
}

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)

    const initial = user?.name
        ? user.name.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase() ?? '?'

    const navLinkClass = ({ isActive }) =>
        `text-sm font-semibold transition-colors duration-150 pb-0.5 ${
            isActive
                ? 'text-coral border-b-2 border-coral'
                : 'text-text-secondary hover:text-text-primary'
        }`

    return (
        <nav className="sticky top-0 z-50 bg-surface border-b border-gray-100 shadow-elevation-1">
            <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to={isAuthenticated ? '/inicio' : '/'} className="font-black text-coral text-xl tracking-tight">
                    DanzApp
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink key={to} to={to} className={navLinkClass}>
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <button
                                className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-full"
                                aria-label="Buscar"
                            >
                                <Search size={20} />
                            </button>
                            <button
                                className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-full"
                                aria-label="Notificaciones"
                            >
                                <BellIcon />
                            </button>
                            <button
                                onClick={logout}
                                className="w-9 h-9 rounded-full bg-coral text-white text-sm font-bold flex items-center justify-center hover:bg-coral-hover transition-colors"
                                title={`${user?.name ?? user?.email} — Cerrar sesión`}
                            >
                                {initial}
                            </button>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                to="/iniciar-sesion"
                                className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/registro"
                                className="text-sm font-semibold bg-coral text-white px-4 py-2 rounded-btn hover:bg-coral-hover transition-colors"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Menú"
                    >
                        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-surface border-t border-gray-100 px-4 pb-4 pt-2 flex flex-col gap-3">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={navLinkClass}
                            onClick={() => setMobileOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}
                    {!isAuthenticated && (
                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                            <Link
                                to="/iniciar-sesion"
                                className="text-sm font-semibold text-text-secondary"
                                onClick={() => setMobileOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/registro"
                                className="text-sm font-semibold bg-coral text-white px-4 py-2 rounded-btn text-center hover:bg-coral-hover transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
