import { Link } from 'react-router-dom'

const AuthLayout = ({
  children,
  eyebrow,
  title,
  description,
  alternateText,
  alternateLabel,
  alternateTo,
}) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b14] px-4 py-8 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden flex-col justify-between bg-linear-to-br from-cyan-400/20 via-indigo-500/10 to-fuchsia-500/20 p-10 lg:flex">
          <div>
            <div className="mb-16 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-cyan-200 uppercase">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-sm font-black text-slate-950">P</span>
              Perplexity
            </div>
            <p className="max-w-sm text-4xl leading-tight font-semibold tracking-tight text-white">
              Better questions. Brighter answers.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Bring your curiosity into focus with a calmer way to explore, learn, and create.
            </p>
          </div>
          <p className="text-xs text-slate-400">Your next idea is closer than it looks.</p>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-cyan-200 uppercase">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-sm font-black text-slate-950">P</span>
              Perplexity
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase">{eyebrow}</p>
            <h1 className="auth-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{description}</p>
          </div>

          {children}

          <p className="mt-8 text-center text-sm text-slate-400">
            {alternateText}{' '}
            <Link className="font-semibold text-cyan-300 transition hover:text-cyan-200" to={alternateTo}>
              {alternateLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout