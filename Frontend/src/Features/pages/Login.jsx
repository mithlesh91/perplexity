import { useState } from 'react'
import AuthLayout from './AuthLayout'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Unable to sign in.')
      setStatus({ type: 'success', message: data.message || 'Signed in successfully.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout mode="login" title="Sign in to your account" >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-200">
          Email address
          <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        </label>
        <label className="block text-sm font-medium text-slate-200">
          Password
          <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" minLength={6} required />
        </label>
        {status.message && <p className={`rounded-lg px-3 py-2 text-sm ${status.type === 'success' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-red-400/10 text-red-300'}`}>{status.message}</p>}
        <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
