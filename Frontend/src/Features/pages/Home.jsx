import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-lg font-bold text-slate-950">
            P
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide">Perplexity</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-cyan-300">
            Features
          </a>
          <a href="#solutions" className="transition hover:text-cyan-300">
            Solutions
          </a>
          <a href="#pricing" className="transition hover:text-cyan-300">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-10 lg:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              Smarter search
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Find answers faster with a cleaner AI workflow.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Ask better questions, get deeper insights, and turn research into action with a modern AI-powered workspace built for focus.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Login
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
              <div>
                <p className="text-2xl font-bold text-white">3x</p>
                <p>Faster research</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p>AI assistant</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p>Reliable access</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-800 p-3 text-sm text-slate-300">
                    What are the best ways to launch a new AI product in 2026?
                  </div>
                  <div className="rounded-xl bg-cyan-500/10 p-3 text-sm text-cyan-100">
                    Start with a clear user problem, validate pricing, and build a lean MVP around real workflows with strong analytics and feedback loops.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Model</p>
                      <p className="mt-2 font-semibold text-white">GPT-4.1</p>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Speed</p>
                      <p className="mt-2 font-semibold text-white">Fast</p>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Focus</p>
                      <p className="mt-2 font-semibold text-white">Deep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            ['AI Search', 'Get quick, accurate answers with clean summaries and structured responses.'],
            ['Smart Workflows', 'Keep conversations organized and convert ideas into actions without losing context.'],
            ['Team Ready', 'Share results faster and collaborate on research from one central workspace.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 h-11 w-11 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-300">
                ✦
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
              <p className="text-slate-300">{text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
