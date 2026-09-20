import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../Hook/Auth.use.js';



const Home = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate()

  async function logout() {
     await handleLogout()
     navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f3f4f6_35%,_#eef2f7_100%)] text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-base font-bold text-white shadow-lg shadow-slate-200">
            P
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide">Perplexity</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/chat"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Open chat
          </Link>
          <Link
            to="/login"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700"
          >
            Sign in
          </Link>
          <button
            type="button"
            onClick={()=>{logout}}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm backdrop-blur">
            Smarter search
          </div>

          <h1 className="max-w-5xl text-4xl font-black tracking-[-0.07em] text-slate-900 sm:text-5xl lg:text-7xl">
            Ask better questions.
            <span className="block text-slate-500">Get sharper answers.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            Search the web, reason faster, and explore ideas with an AI workspace designed to keep momentum high.
          </p>

          <div className="mt-8 w-full max-w-4xl rounded-[30px] border border-slate-200 bg-white p-3 shadow-[0_25px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="What do you want to know?"
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
              />
              <Link
                to="/chat"
                className="rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-700"
              >
                Search
              </Link>
            </div>
          </div>

          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            {features.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default Home;
