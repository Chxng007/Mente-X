import { forwardRef, useId } from 'react'

const Textarea = forwardRef(function Textarea(
    { label, error, helperText, maxLength, value = '', className = '', ...props },
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
            <textarea
                id={inputId}
                ref={ref}
                value={value}
                maxLength={maxLength}
                aria-invalid={Boolean(error)}
                className={`min-h-[140px] resize-none rounded-input border bg-surface px-4 py-3 text-base text-text-primary outline-none transition-colors placeholder:text-text-secondary/70 focus:ring-2 focus:ring-turquoise/40 ${error ? 'border-error focus:border-error' : 'border-neutral-200 focus:border-turquoise'
                    } ${className}`}
                {...props}
            />
            <div className="flex items-center justify-between">
                {error ? (
                    <p className="text-sm text-error">{error}</p>
                ) : helperText ? (
                    <p className="text-sm text-text-secondary">{helperText}</p>
                ) : <span />}
                {maxLength && (
                    <p className="text-xs font-semibold text-text-secondary">Máx. {maxLength} caracteres</p>
                )}
            </div>
        </div>
    )
})

export default Textarea