import React from 'react';
import { NavLink,useNavigate,Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Hook/Auth.use.js';
import { useSelector } from 'react-redux';


const Register = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Error, setError] = useState("")

 const user = useSelector(state=>state.auth.user)
 const loading = useSelector(state=>state.auth.loading)

  const navigate = useNavigate()
  const {handleRegister}=useAuth()

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      setError("")
      await handleRegister(username,email,password)
      navigate("/login")

    } catch (error) {
      console.log(error)
      {setError(error.response?.data?.message|| "Registation failed")}
    }
  }

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">
            Welcome
          </p>
          <h1 className="auth-heading mt-3 text-3xl font-bold text-white">
            Create account
          </h1>
        </div>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm text-slate-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

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

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            Sign up
          </button>
          {Error && (<p className='text-red-500'>{Error}</p>)}
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-cyan-300 underline underline-offset-4'
                : 'font-medium text-slate-300 hover:text-cyan-200'
            }
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
