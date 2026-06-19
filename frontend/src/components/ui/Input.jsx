import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
    { label, error, helperText, type = 'text', className = '', ...props },
    ref
) {
    const generatedId = useId()
    const inputId = props.id ?? generatedId

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold text-text-primary">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                ref={ref}
                type={type}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`rounded-input border bg-surface px-4 py-3 text-base text-text-primary outline-none transition-colors placeholder:text-text-secondary/70 focus:ring-2 focus:ring-turquoise/40 ${error ? 'border-error focus:border-error' : 'border-neutral-200 focus:border-turquoise'
                    } ${className}`}
                {...props}
            />
            {error ? (
                <p id={`${inputId}-error`} className="text-sm text-error">
                    {error}
                </p>
            ) : helperText ? (
                <p className="text-sm text-text-secondary">{helperText}</p>
            ) : null}
        </div>
    )
})

export default Input