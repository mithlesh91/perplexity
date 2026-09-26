import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usechat } from '../Hook/chat.hook.js'

const Chatpage = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { chats, currentchatId, isLoading, error, handleSendmsg, handleNewChat, handleSelectChat } = usechat()
  const currentChat = currentchatId ? chats[currentchatId] : null
  const messages = currentChat?.messages || []
  const chatList = Object.entries(chats)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage || isLoading) return

    setMessage('')
    try {
      await handleSendmsg({ message: trimmedMessage, chatId: currentchatId })
    } catch {
      setMessage(trimmedMessage)
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] p-3 text-[#242421] sm:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-375 overflow-hidden rounded-4xl border border-[#242421] bg-[#fbfaf6] shadow-[8px_8px_0_#242421] sm:min-h-[calc(100vh-2.5rem)]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-[#242421] bg-[#e6e1d7] p-5 md:flex lg:w-72 lg:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f26a] text-sm font-black">P</div>
            <span className="font-mono text-lg font-bold tracking-[-0.08em]">perplexity</span>
          </div>

          <div className="mt-14 flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#77756e]">Your chats</p>
            <button type="button" onClick={handleNewChat} aria-label="Start a new chat" className="text-xl leading-none transition hover:rotate-90">+</button>
          </div>

          <nav className="mt-4 space-y-2" aria-label="Chat history">
            {chatList.map(([chatId, chat]) => (
              <button
                key={chatId}
                type="button"
                onClick={() => handleSelectChat(chatId)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left font-mono text-sm transition ${currentchatId === chatId ? 'border-[#242421] bg-[#fbfaf6] shadow-[3px_3px_0_#242421]' : 'border-transparent hover:border-[#aaa69c]'}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef6b4a]" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#aaa69c] pt-5">
            <button type="button" className="flex w-full items-center gap-3 font-mono text-sm text-[#77756e] transition hover:text-[#242421]">
              <span aria-hidden="true">↳</span> Settings
            </button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#d6d1c7] px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d6d1c7] text-lg transition hover:border-[#242421] hover:bg-[#d8f26a]"
              >
                <span aria-hidden="true">←</span>
              </button>
              <div className="flex items-center gap-3 md:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8f26a] text-xs font-black">P</div>
                <span className="font-mono text-sm font-bold tracking-[-0.08em]">perplexity</span>
              </div>
            </div>
            <div className="hidden font-mono text-xs text-[#77756e] md:block">{currentChat?.title || 'New conversation'}</div>
            <button type="button" className="flex items-center gap-2 rounded-full border border-[#242421] bg-[#fffdf8] px-3 py-2 font-mono text-xs font-bold transition hover:bg-[#d8f26a] sm:px-4">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#242421] text-[10px] text-white">U</span>
              <span className="hidden sm:inline">user</span>
            </button>
          </header>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-8 sm:px-10 sm:py-10">
            {messages.length === 0 ? (
              <div className="m-auto max-w-md text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#242421] bg-[#d8f26a] font-mono text-lg font-bold shadow-[3px_3px_0_#242421]">ai</div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#77756e]">Ask anything</p>
                <h1 className="mt-4 font-sans text-3xl font-extrabold tracking-[-0.06em] sm:text-4xl">What are we exploring today?</h1>
                <p className="mt-4 text-sm leading-6 text-[#77756e]">Search the web, untangle an idea, or start with a question.</p>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
                {messages.map((chatMessage, index) => (
                  <div key={chatMessage._id || `${chatMessage.role}-${index}`} className={`flex items-start gap-3 ${chatMessage.role === 'user' ? 'justify-end' : ''}`}>
                    {chatMessage.role !== 'user' && <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d8f26a] font-mono text-xs font-bold">ai</span>}
                    <p className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${chatMessage.role === 'user' ? 'rounded-br-sm bg-[#242421] text-white' : 'rounded-bl-sm border border-[#d6d1c7] bg-white text-[#242421]'}`}>
                      {chatMessage.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full px-4 pb-4 sm:px-8 sm:pb-7">
            {error && <p role="alert" className="mx-auto mb-3 max-w-2xl text-sm text-[#c5482f]">{error}</p>}
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-[#242421] bg-[#fffdf8] p-2 pl-4 shadow-[3px_3px_0_#242421] focus-within:bg-white">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask a question"
                className="min-w-0 flex-1 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-[#aaa69c]"
              />
              <button type="submit" aria-label="Send question" disabled={isLoading} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#242421] text-lg text-white transition hover:bg-[#ef6b4a] disabled:cursor-wait disabled:opacity-60">{isLoading ? '…' : '↑'}</button>
            </form>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#aaa69c]">Powered by curiosity</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Chatpage
