import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('perplexityUser') || '{}')

  const handleSignOut = () => {
    localStorage.removeItem('perplexityUser')
    navigate('/login')
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b14] px-4 text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <section className="relative w-full max-w-2xl rounded-4xl border border-white/10 bg-white/6 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-14">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950">P</span>
        <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase">You are signed in</p>
        <h1 className="auth-heading mt-3 text-4xl font-bold tracking-tight text-white">Welcome{user.email ? `, ${user.email}` : ''}.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">Your Perplexity workspace is ready for the next question.</p>
        <button className="mt-8 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200" onClick={handleSignOut} type="button">
          Sign out
        </button>
      </section>
    </main>
  )
}

export default Home