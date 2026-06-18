const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

function App() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] text-neutral-950">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red-700">
          DanzApp
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-none md:text-7xl">
          Frontend React con Vite y Tailwind listo.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
          Este contenedor corre el frontend y queda conectado al backend de Spring Boot
          dentro del mismo Docker Compose.
        </p>
        <div className="mt-8 rounded-lg border border-neutral-300 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-neutral-500">API backend</p>
          <p className="mt-1 break-all font-mono text-sm text-neutral-900">{apiUrl}</p>
        </div>
      </section>
    </main>
  )
}

export default App
