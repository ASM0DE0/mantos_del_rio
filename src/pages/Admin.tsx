import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured, type ChurchEvent } from '@/lib/supabase'
import { EVENT_CATEGORIES } from '@/lib/constants'

export function Admin() {
  const [events, setEvents] = useState<ChurchEvent[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    location: '',
    category: 'culto',
  })
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)

  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  useEffect(() => {
    if (!authed || !isSupabaseConfigured || !supabase) return
    supabase
      .from('events')
      .select('*')
      .then(({ data }) => setEvents((data as ChurchEvent[]) || []))
  }, [authed])

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (password === adminPass) setAuthed(true)
    else alert('Contraseña incorrecta')
  }

  const addEvent = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    const { data, error } = await supabase.from('events').insert(form).select().single()
    if (!error && data) setEvents((prev) => [...prev, data as ChurchEvent])
    setForm({ title: '', description: '', start: '', end: '', location: '', category: 'culto' })
  }

  const deleteEvent = async (id: string) => {
    if (!supabase) return
    await supabase.from('events').delete().eq('id', id)
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-deep-blue text-white p-8">
        <p>Configura Supabase en .env para usar el panel admin.</p>
        <Link to="/" className="text-gold-soft mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-deep-blue flex items-center justify-center p-4">
        <form onSubmit={login} className="glass-panel p-8 max-w-sm w-full space-y-4">
          <h1 className="font-display text-2xl text-white text-center">Panel Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white"
          />
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
          <Link to="/" className="block text-center text-gold-soft text-sm">
            <ArrowLeft className="inline" size={14} /> Inicio
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-glow dark:bg-deep-blue py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-deep-blue dark:text-white">Administrar eventos</h1>
          <Link to="/" className="text-gold-soft flex items-center gap-1">
            <ArrowLeft size={18} /> Inicio
          </Link>
        </div>

        <form onSubmit={addEvent} className="glass-panel p-6 space-y-4 mb-8">
          <h2 className="font-semibold text-deep-blue dark:text-white flex items-center gap-2">
            <Plus size={20} /> Nuevo evento
          </h2>
          <input
            required
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
          <textarea
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              required
              type="datetime-local"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: new Date(e.target.value).toISOString() })}
              className="px-4 py-2 rounded-lg border"
            />
            <input
              type="datetime-local"
              onChange={(e) => setForm({ ...form, end: e.target.value ? new Date(e.target.value).toISOString() : '' })}
              className="px-4 py-2 rounded-lg border"
            />
          </div>
          <input
            placeholder="Ubicación"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
          >
            {EVENT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary">
            Guardar evento
          </button>
        </form>

        <ul className="space-y-3">
          {events.map((ev) => (
            <li key={ev.id} className="glass-panel p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-deep-blue dark:text-white">{ev.title}</p>
                <p className="text-sm text-deep-navy/70 dark:text-white/60">
                  {new Date(ev.start).toLocaleString('es')}
                </p>
              </div>
              <button type="button" onClick={() => deleteEvent(ev.id)} className="text-red-500 p-2" aria-label="Eliminar">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
