import Navbar from './Navbar'

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-8">
                {children}
            </main>
        </div>
    )
}
