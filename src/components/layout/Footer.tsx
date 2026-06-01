import { CHURCH } from '@/lib/constants'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-deep-blue text-white/80 py-12 border-t border-gold-soft/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl text-gold-soft mb-3">{CHURCH.shortName}</h3>
          <p className="text-sm leading-relaxed">{CHURCH.tagline}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Horarios</h4>
          <ul className="text-sm space-y-2">
            {CHURCH.schedule.map((s) => (
              <li key={s.day}>
                <span className="text-gold-soft">{s.day}:</span> {s.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Síguenos</h4>
          <div className="flex gap-4">
            <a href={CHURCH.social.facebook} className="hover:text-gold-soft transition-colors" aria-label="Facebook">
              <Facebook size={22} />
            </a>
            <a href={CHURCH.social.instagram} className="hover:text-gold-soft transition-colors" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href={CHURCH.social.youtube} className="hover:text-gold-soft transition-colors" aria-label="YouTube">
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-10 text-white/50">
        © {year} {CHURCH.name}. Todos los derechos reservados.
      </p>
    </footer>
  )
}
