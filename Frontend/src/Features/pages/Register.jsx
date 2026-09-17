import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from "../Hook/Auth.use.js"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { handleRegister } = useAuth()


  const handleChange = (event) => {
    setFormData((currentData) => ({ ...currentData, [event.target.name]: event.target.value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.username || !formData.email || !formData.password) {
      setError('Complete all fields to create your account.')
      return
    }

    const success = await handleRegister(formData.username, formData.email, formData.password)

    if (!success) {
      setError('Registration failed. Please try again.')
      return
    }

    localStorage.setItem('perplexityRegistration', JSON.stringify(formData))
    navigate('/login')
  }

  return (
    <AuthLayout
      alternateLabel="Sign in"
      alternateText="Already have an account?"
      alternateTo="/login"
      description="Create your account and give your best questions somewhere to go."
      eyebrow="Start exploring"
      title="Create your account"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-200" htmlFor="register-username">
          Username
          <input
            autoComplete="username"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            id="register-username"
            name="username"
            onChange={handleChange}
            placeholder="Choose a username"
            type="text"
            value={formData.username}
          />
        </label>

        <label className="block text-sm font-medium text-slate-200" htmlFor="register-email">
          Email address
          <input
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            id="register-email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            value={formData.email}
          />
        </label>

        <label className="block text-sm font-medium text-slate-200" htmlFor="register-password">
          Password
          <input
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            id="register-password"
            minLength="6"
            name="password"
            onChange={handleChange}
            placeholder="At least 6 characters"
            type="password"
            value={formData.password}
          />
        </label>

        {error && <p className="text-sm text-rose-300" role="alert">{error}</p>}

        <button className="w-full rounded-xl bg-cyan-300 px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:ring-4 focus:ring-cyan-300/20 focus:outline-none" type="submit">
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
