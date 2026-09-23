import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hook/Auth.use.js';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const displayName =
    user?.username || user?.name || user?.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    try {
      await handleLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              Perplexity
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="space-y-6">


          <section className="flex min-h-[420px] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl font-bold text-cyan-700">
                AI
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-900">How can I help you today?</h2>

            </div>

            <form
              className="border-t border-slate-100 p-4 sm:p-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 pl-4 transition focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                <input
                  type="text"
                  aria-label="Message AI"
                  placeholder="Message AI..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="flex h-10 w-20 shrink-0 items-center justify-center rounded-[10px] bg-slate-900 text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                >
                  {/* <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 14-7-4 14-3-6-7-1Z" />
                    <path d="m12 13 4-4" />
                  </svg> */}
                  search
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
