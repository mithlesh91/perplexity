import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Auth/Hook/Auth.use.js"
import { usechat } from "../Hook/chat.hook.js"



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

  const { initlazationSocket } = usechat()

  useEffect(() => {
    initlazationSocket()
  })



  return (
    <main className="min-h-screen bg-[#f4f1ea] p-3 text-[#242421] sm:p-5">
      <div className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-375 rounded-4xl border border-[#242421] bg-[#fbfaf6] shadow-[8px_8px_0_#242421] sm:min-h-[calc(100vh-2.5rem)]">
        <header className="flex items-center justify-between border-b border-[#d6d1c7] px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f26a] text-sm font-black">P</div>
            <div>
              <p className="font-mono text-lg font-bold tracking-[-0.08em]">perplexity</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#77756e]">Your workspace</p>
            </div>
          </div>
          <button type="button" onClick={handleSignOut} className="rounded-full border border-[#242421] bg-[#fffdf8] px-4 py-2 font-mono text-xs font-bold transition hover:bg-[#d8f26a]">
            Log out
          </button>
        </header>

        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-20">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#ef6b4a]">Good to see you, {displayName}</p>
              <h1 className="mt-4 max-w-2xl font-sans text-4xl font-extrabold tracking-[-0.07em] sm:text-6xl">What should we think through?</h1>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#77756e]">Ask questions, explore ideas, and keep your thinking in one place.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-[1.35fr_1fr]">
            <button type="button" onClick={() => navigate('/chat')} className="group min-h-64 rounded-3xl border border-[#242421] bg-[#d8f26a] p-6 text-left shadow-[5px_5px_0_#242421] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#242421] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#242421] bg-[#fbfaf6] font-mono font-bold">+</div>
              <div className="mt-16 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">New conversation</p>
                  <p className="mt-2 text-2xl font-extrabold tracking-[-0.05em]">Start exploring</p>
                </div>
                <span className="text-3xl transition-transform group-hover:translate-x-1">↗</span>
              </div>
            </button>

            <div className="rounded-3xl border border-[#d6d1c7] bg-[#e6e1d7] p-6 sm:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#77756e]">Recent chats</p>
              <div className="mt-5 space-y-3">
                {['Research notes', 'Product strategy', 'Weekend ideas'].map((chat) => (
                  <button key={chat} type="button" onClick={() => navigate('/chat')} className="flex w-full items-center justify-between border-b border-[#c8c2b7] pb-3 text-left font-mono text-sm transition hover:text-[#ef6b4a]">
                    <span>{chat}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;


