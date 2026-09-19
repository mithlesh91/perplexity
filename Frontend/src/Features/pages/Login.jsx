import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Hook/Auth.use.js';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState()

  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  async function handsubmit(e) {
    e.preventDefault();

    try {
      seterror("")
      await handleLogin( email, password )
      navigate("/")
    } catch (error) {
      console.log(error)
      {seterror(error.response?.data?.message || "something went wrong")}
    }

  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">
            Welcome back
          </p>
          <h1 className="auth-heading mt-3 text-3xl font-bold text-white">
            Login
          </h1>
        </div>

        <form onSubmit={handsubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-500" />
              Remember me
            </label>
            <a href="#" className="text-cyan-300 hover:text-cyan-200">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            Login
          </button>
          {error && (<p className='text-red-500'>{error}</p>)}
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-cyan-300 underline underline-offset-4'
                : 'font-medium text-slate-300 hover:text-cyan-200'
            }
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
