/**
 * El backend a veces responde con un string plano (ej. AuthController),
 * a veces con JSON de error de Spring Boot. Esta función normaliza eso.
 */
export function extractErrorMessage(error, fallback = 'Ocurrió un error inesperado. Intenta de nuevo.') {
    const data = error?.response?.data

    if (!data) return error?.message || fallback
    if (typeof data === 'string') return data
    if (typeof data?.message === 'string' && data.message !== 'No message available') {
        return data.message
    }
    if (typeof data?.error === 'string') return data.error

    return fallback
}