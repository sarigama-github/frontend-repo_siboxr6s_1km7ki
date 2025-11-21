import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live • Unified AI + Music + Health
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Xuby — Your unified brain for chat, research, music, and health
          </h1>
          <p className="mt-4 text-base text-zinc-300 sm:text-lg md:text-xl">
            Ask anything, explore the web, queue songs, and track your wellbeing — all in one sleek, chromatic space.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#get-started" className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 text-black font-medium shadow-lg shadow-emerald-400/20 hover:bg-emerald-300 transition">
              Get started
            </a>
            <a href="#widgets" className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-zinc-200 hover:bg-white/5 transition">
              Explore widgets
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
