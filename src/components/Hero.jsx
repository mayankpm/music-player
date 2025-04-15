export default function Hero() {
    return (
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-semibold tracking-tight text-platinum">OPUS</h1>
        <p className="text-xl text-gray-400 mt-4">Luxury Sound. Redefined.</p>
        <div className="mt-16 animate-bounce text-lux-gold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>
    )
  }
  