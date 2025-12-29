import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">404</h1>
        <p className="text-lg text-gray-400">Page not found.</p>
        <div>
          <NavLink
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
          >
            Go Home
          </NavLink>
        </div>
      </div>
    </section>
  )
}

