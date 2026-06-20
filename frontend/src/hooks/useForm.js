import { useCallback, useState } from 'react'

export function useForm({ initialValues, validate }) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    const handleChange = useCallback((event) => {
        const { name, value } = event.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }, [])

    const handleBlur = useCallback((event) => {
        const { name } = event.target
        setTouched((prev) => ({ ...prev, [name]: true }))
    }, [])

    const validateAll = useCallback(() => {
        const nextErrors = validate ? validate(values) : {}
        setErrors(nextErrors)
        setTouched(
            Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        )
        return Object.keys(nextErrors).length === 0
    }, [validate, values])

    const reset = useCallback(() => {
        setValues(initialValues)
        setErrors({})
        setTouched({})
    }, [initialValues])

    return { values, errors, touched, handleChange, handleBlur, validateAll, reset, setValues }
}