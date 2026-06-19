export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function validateLoginForm(values) {
    const errors = {}

    if (!values.email) errors.email = 'El correo es obligatorio.'
    else if (!isValidEmail(values.email)) errors.email = 'Ingresa un correo válido.'

    if (!values.password) errors.password = 'La contraseña es obligatoria.'

    return errors
}

export function validateRegisterForm(values) {
    const errors = {}

    if (!values.name || values.name.trim().length < 2) {
        errors.name = 'Ingresa tu nombre completo.'
    }

    if (!values.email) errors.email = 'El correo es obligatorio.'
    else if (!isValidEmail(values.email)) errors.email = 'Ingresa un correo válido.'

    if (!values.password) errors.password = 'La contraseña es obligatoria.'
    else if (values.password.length < 8) errors.password = 'Debe tener al menos 8 caracteres.'

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Las contraseñas no coinciden.'
    }

    return errors
}