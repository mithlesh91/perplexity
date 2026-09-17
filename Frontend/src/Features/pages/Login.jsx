import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from "../Hook/Auth.use.js"
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const { handleLogin } = useAuth()

  const handleChange = (event) => {
    setFormData((currentData) => ({ ...currentData, [event.target.name]: event.target.value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Enter your email and password to continue.')
      return
    }

    const success = await handleLogin(formData.email, formData.password)

    if (!success) {
      setError('Invalid email or password. Please try again.')
      return
    }

    localStorage.setItem('perplexityUser', JSON.stringify({ email: formData.email }))
    navigate('/')
  }

  return (
    <AuthLayout
      alternateLabel="Create an account"
      alternateText="New to Perplexity?"
      alternateTo="/register"
      description="Pick up where you left off and keep exploring ideas that matter to you."
      eyebrow="Welcome back"
      title="Sign in to continue"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-200" htmlFor="login-email">
          Email address
          <input
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            id="login-email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            value={formData.email}
          />
        </label>

        <label className="block text-sm font-medium text-slate-200" htmlFor="login-password">
          Password
          <input
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            id="login-password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
            value={formData.password}
          />
        </label>

        <div className="flex justify-end">
          <Link className="text-xs font-medium text-slate-400 transition hover:text-cyan-300" to="/register">
            Need an account?
          </Link>
        </div>

        {error && <p className="text-sm text-rose-300" role="alert">{error}</p>}

        <button className="w-full rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:ring-4 focus:ring-cyan-300/20 focus:outline-none" type="submit">
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
