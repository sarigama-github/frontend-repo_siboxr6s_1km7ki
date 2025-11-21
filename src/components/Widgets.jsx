import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="mb-3 text-sm font-medium text-zinc-300">{title}</h3>
      {children}
    </div>
  )
}

function ChatWidget() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const send = async () => {
    if (!input.trim()) return
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: 'demo', role: 'user', content: input })
    })
    const data = await res.json()
    setMessages((m) => [...m, { role: 'user', content: input }, data])
    setInput('')
  }

  useEffect(() => {
    // Load existing messages for demo session
    (async () => {
      const res = await fetch(`${API_BASE}/chat/messages?session_id=demo`)
      const data = await res.json()
      setMessages(data.items || [])
    })()
  }, [])

  return (
    <Section title="Chat">
      <div className="h-48 overflow-y-auto space-y-2 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'user' ? 'text-emerald-300' : 'text-zinc-300'}`}>
            <span className="uppercase text-[10px] tracking-wider text-zinc-500 mr-2">{m.role || 'msg'}</span>
            {m.content}
          </div>
        ))}
        {messages.length === 0 && <p className="text-zinc-500 text-sm">No messages yet. Say hi!</p>}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="flex-1 rounded-lg bg-black/40 border border-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/30" />
        <button onClick={send} className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-300">Send</button>
      </div>
    </Section>
  )
}

function MusicWidget() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [tracks, setTracks] = useState([])

  const load = async () => {
    const res = await fetch(`${API_BASE}/music/tracks`)
    const data = await res.json()
    setTracks(data.items || [])
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!title.trim() || !artist.trim()) return
    await fetch(`${API_BASE}/music/tracks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, artist })
    })
    setTitle(''); setArtist('')
    load()
  }

  return (
    <Section title="Music Queue">
      <div className="space-y-2">
        {tracks.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg bg-black/40 border border-zinc-800 px-3 py-2">
            <div>
              <p className="text-sm text-white">{t.title}</p>
              <p className="text-xs text-zinc-500">{t.artist}</p>
            </div>
          </div>
        ))}
        {tracks.length === 0 && <p className="text-zinc-500 text-sm">Your queue is empty.</p>}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="col-span-1 rounded-lg bg-black/40 border border-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none" />
        <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" className="col-span-1 rounded-lg bg-black/40 border border-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none" />
        <button onClick={add} className="col-span-1 rounded-lg bg-emerald-400 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-300">Add</button>
      </div>
    </Section>
  )
}

function HealthWidget() {
  const [type, setType] = useState('steps')
  const [value, setValue] = useState('')
  const [entries, setEntries] = useState([])

  const load = async () => {
    const res = await fetch(`${API_BASE}/health/entries`)
    const data = await res.json()
    setEntries(data.items || [])
  }

  useEffect(() => { load() }, [])

  const add = async () => {
    if (!value) return
    await fetch(`${API_BASE}/health/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 'demo', type, value: parseFloat(value) })
    })
    setValue('')
    load()
  }

  return (
    <Section title="Health Tracker">
      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
        {entries.map((e) => (
          <div key={e.id} className="flex items-center justify-between rounded-lg bg-black/40 border border-zinc-800 px-3 py-2">
            <p className="text-sm text-white">{e.type}</p>
            <p className="text-sm text-emerald-300">{e.value}</p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-zinc-500 text-sm">No entries yet.</p>}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <select value={type} onChange={(e) => setType(e.target.value)} className="col-span-1 rounded-lg bg-black/40 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none">
          <option value="steps">Steps</option>
          <option value="sleep">Sleep</option>
          <option value="water">Water</option>
          <option value="calories">Calories</option>
          <option value="mood">Mood</option>
        </select>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="col-span-1 rounded-lg bg-black/40 border border-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none" />
        <button onClick={add} className="col-span-1 rounded-lg bg-emerald-400 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-300">Add</button>
      </div>
    </Section>
  )
}

export default function Widgets() {
  return (
    <section id="widgets" className="relative z-10 -mt-12 mx-auto max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ChatWidget />
        <MusicWidget />
        <HealthWidget />
      </div>
    </section>
  )
}
