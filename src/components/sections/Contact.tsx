import { useState, type FormEvent } from 'react'
import {
  MapPin,
  Clock,
  Mail,
  Send,
  Phone,
  Navigation,
  Instagram,
  Facebook
} from 'lucide-react'

import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { CHURCH } from '@/lib/constants'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('contact_messages').insert(form)
        if (error) throw error
      }

      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Contacto y Ubicación"
          subtitle="Visítanos, escríbenos o síguenos en redes."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* MAPA */}
          <GlassCard className="p-0 overflow-hidden min-h-[320px]">
            <iframe
              title="Ubicación de la iglesia"
              src={CHURCH.mapsEmbed}
              className="w-full h-full min-h-[320px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </GlassCard>

          <div className="space-y-6">

            {/* DIRECCIÓN */}
            <GlassCard>
              <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-gold-soft" size={22} /> Dirección
              </h3>

              <p className="text-deep-navy/80 dark:text-white/75 mb-2">
                {CHURCH.address}
              </p>

              <p className="text-sm text-deep-navy/60 dark:text-white/60 mb-3">
                Código Plus: <strong className="text-gold-soft">{CHURCH.locationCode}</strong>
              </p>

              <a
                href={CHURCH.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold-soft hover:underline"
              >
                <Navigation size={16} /> Abrir en Google Maps
              </a>
            </GlassCard>

            {/* WHATSAPP */}
            <GlassCard>
              <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                <Phone className="text-gold-soft" size={22} /> Teléfono / WhatsApp
              </h3>

              <a
                href={`https://wa.me/${CHURCH.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-deep-navy/80 dark:text-white/75 hover:text-gold-soft"
              >
                {CHURCH.phone}
              </a>
            </GlassCard>

            {/* HORARIOS */}
            <GlassCard>
              <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                <Clock className="text-gold-soft" size={22} /> Horarios
              </h3>

              <ul className="space-y-2 text-deep-navy/80 dark:text-white/75">
                {CHURCH.schedule.map((s) => (
                  <li key={s.day}>
                    <strong className="text-gold-soft">{s.day}:</strong> {s.time}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* REDES SOCIALES */}
            <GlassCard>
              <h3 className="font-display text-xl font-semibold mb-4">
                Redes Sociales
              </h3>

              <div className="space-y-3">

                <a
                  href="https://www.instagram.com/impchmantosdelrio?igsh=MXB0NTV4aXNrcHp2OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-deep-navy/80 dark:text-white/75 hover:text-gold-soft"
                >
                  <Instagram size={18} /> Síguenos en Instagram
                </a>

                <a
                  href="https://www.facebook.com/share/196voRGBP8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-deep-navy/80 dark:text-white/75 hover:text-gold-soft"
                >
                  <Facebook size={18} /> Síguenos en Facebook
                </a>

                <a
                  href="https://genesisensintonia.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-deep-navy/80 dark:text-white/75 hover:text-gold-soft"
                >
                  🎧 Escuchar Radio en Vivo
                </a>

              </div>
            </GlassCard>

            {/* FORMULARIO */}
            <GlassCard>
              <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                <Mail className="text-gold-soft" size={22} /> Escríbenos
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                <input
                  type="text"
                  required
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
                />

                <input
                  type="email"
                  required
                  placeholder="Correo"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
                />

                <textarea
                  required
                  rows={4}
                  placeholder="Mensaje"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 resize-none"
                />

                {status === 'ok' && (
                  <p className="text-green-600 text-sm">Mensaje enviado. ¡Gracias!</p>
                )}

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Error al enviar. Intenta de nuevo.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </GlassCard>

          </div>
        </div>
      </div>
    </section>
  )
}
