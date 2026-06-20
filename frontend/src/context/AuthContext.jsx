import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const TOKEN_KEY = 'danzapp_token'
const USER_KEY = 'danzapp_user'

function readStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
    const [user, setUser] = useState(readStoredUser)

    // Recibe la JwtResponse completa del backend y la persiste
    const persistSession = useCallback((session) => {
        const userData = {
            id: session.id,
            email: session.email,
            name: session.name,
            roles: session.roles,
        }

        localStorage.setItem(TOKEN_KEY, session.token)
        localStorage.setItem(USER_KEY, JSON.stringify(userData))

        setToken(session.token)
        setUser(userData)
    }, [])

    const updateUser = useCallback((partialUser) => {
        setUser((prev) => {
            const next = { ...prev, ...partialUser }
            localStorage.setItem(USER_KEY, JSON.stringify(next))
            return next
        })
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
    }, [])

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: Boolean(token),
            persistSession,
            logout,
        }),
        [token, user, persistSession, logout]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth debe usarse dentro de un <AuthProvider>')
    }
    return ctx
}