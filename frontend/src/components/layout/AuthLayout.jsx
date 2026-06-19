import Card from '../ui/Card'

export default function AuthLayout({ title, subtitle, children, footer }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-bg-primary px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <span className="inline-flex items-center justify-center rounded-btn bg-coral px-4 py-2 text-sm font-black uppercase tracking-widest text-white">
                        DanzApp
                    </span>
                    <h1 className="mt-6 text-3xl font-black text-text-primary">{title}</h1>
                    {subtitle && <p className="mt-2 text-text-secondary">{subtitle}</p>}
                </div>

                <Card>{children}</Card>

                {footer && <div className="mt-6 text-center text-sm text-text-secondary">{footer}</div>}
            </div>
        </main>
    )
}