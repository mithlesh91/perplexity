import { Link } from 'react-router'

const AuthLayout = ({ children, title, description, mode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/30 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-xl font-semibold text-white shadow-md shadow-blue-600/20">
            P
          </div>
          <p className="auth-heading mb-3 text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase">Perplexity</p>
          <h1 className="auth-heading text-2xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {children}
        <p className="mt-8 text-center text-sm text-slate-400">
          {mode === 'login' ? 'New to Perplexity?' : 'Already have an account?'}{' '}
          <Link className="font-semibold text-blue-400 transition hover:text-blue-300" to={mode === 'login' ? '/Register' : '/Login'}>
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </Link>
        </p>
      </section>
    </main>
  )
}

export default AuthLayout