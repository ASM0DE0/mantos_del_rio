import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export function PrayerRequests() {
  const [name, setName] = useState('')
  const [request, setRequest] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!request.trim()) {
      setError('Por favor escribe tu petición.')
      return
    }
    setLoading(true)

    const payload = {
      name: anonymous ? 'Anónimo' : name.trim() || 'Hermano/a',
      request: request.trim(),
      is_anonymous: anonymous,
    }

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: err } = await supabase.from('prayer_requests').insert(payload)
        if (err) throw err
      } else {
        const stored = JSON.parse(localStorage.getItem('prayer-requests') || '[]')
        stored.push({ ...payload, id: Date.now(), created_at: new Date().toISOString() })
        localStorage.setItem('prayer-requests', JSON.stringify(stored))
      }
      setSent(true)
      setName('')
      setRequest('')
      setAnonymous(false)
    } catch {
      setError('No pudimos enviar tu petición. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="oracion" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="Peticiones de Oración"
          subtitle="Comparte tu necesidad. Nuestra comunidad intercederá por ti."
        />

        <GlassCard>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="mx-auto text-gold-soft mb-4" size={48} />
              <h3 className="font-display text-xl font-semibold text-deep-blue dark:text-white mb-2">
                Oración recibida
              </h3>
              <p className="text-deep-navy/80 dark:text-white/70 mb-6">
                Gracias por confiar en nosotros. Estamos orando por ti.
              </p>
              <button type="button" onClick={() => setSent(false)} className="btn-primary">
                Enviar otra petición
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 text-gold-soft mb-2">
                <Heart size={22} />
                <span className="font-medium">Tu petición es importante</span>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded border-gold-soft text-gold-soft focus:ring-gold-soft"
                />
                <span className="text-deep-blue dark:text-white">Enviar de forma anónima</span>
              </label>

              {!anonymous && (
                <div>
                  <label htmlFor="prayer-name" className="block text-sm font-medium mb-2 text-deep-blue dark:text-white">
                    Nombre
                  </label>
                  <input
                    id="prayer-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-panel text-deep-blue dark:text-white"
                    placeholder="Tu nombre"
                  />
                </div>
              )}

              <div>
                <label htmlFor="prayer-request" className="block text-sm font-medium mb-2 text-deep-blue dark:text-white">
                  Petición de oración *
                </label>
                <textarea
                  id="prayer-request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl glass-panel text-deep-blue dark:text-white resize-none"
                  placeholder="Escribe tu petición..."
                />
              </div>

              {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                <Send size={18} />
                {loading ? 'Enviando...' : 'Enviar oración'}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  )
}
