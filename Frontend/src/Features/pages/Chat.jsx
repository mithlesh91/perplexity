import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../Hook/Auth.use.js';


const Chat = () => {
  const navigate = useNavigate();
  const { handlechatbot } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    setMessages((current) => [...current, { role: 'user', content: trimmedMessage }]);
    setMessage('');
    setError('');

    try {
      const response = await handlechatbot(trimmedMessage);
      setMessages((current) => [...current, { role: 'assistant', content: response.message }]);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to get a response right now.');
    }
  };

  // 

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-slate-900">
      <div className="mx-auto flex h-screen max-w-350 flex-col px-3 py-3 sm:px-5 sm:py-5">
        <header className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              P
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-900">Perplexity</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Home
            </Link>
            {user && (
              <button
                type="button"
                onClick={onLogout}
                className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            )}
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-4">
              {messages.length === 0 && (
                <div className="py-16 text-center">
                  <h1 className="text-2xl font-semibold text-slate-900">What can I help you find?</h1>
                  <p className="mt-2 text-sm text-slate-500">Ask a question to start a conversation.</p>
                </div>
              )}
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    item.role === 'user'
                      ? 'self-end bg-slate-900 text-white'
                      : 'self-start border border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  {item.content}
                </div>
              ))}
              {loading && <div className="self-start text-sm text-slate-500">Thinking...</div>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmit} className="mx-auto max-w-4xl rounded-[22px] border border-slate-200 bg-slate-50 p-3 shadow-inner">
              <div className="flex items-end gap-3">
                <textarea
                  rows="1"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form.requestSubmit();
                    }
                  }}
                  placeholder="Ask anything..."
                  className="max-h-32 min-h-13 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button disabled={!message.trim() || loading} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50">
                  {loading ? 'Sending...' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
