import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { CHURCH, NAV_LINKS } from '@/lib/constants'
import { useScrollNav } from '@/hooks/useScrollNav'

interface NavbarProps {
  dark: boolean
  onToggleTheme: () => void
}

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
  const scrolled = useScrollNav()
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep-blue/95 dark:bg-deep-blue/98 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="w-10 h-10 rounded-xl bg-gold-soft/20 border border-gold-soft/40 flex items-center justify-center font-display font-bold text-gold-soft">
            {CHURCH.logoInitials}
          </span>
          <span className="hidden sm:block font-display text-white font-semibold text-lg group-hover:text-gold-light transition-colors">
            {CHURCH.shortName}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm text-white/90 hover:text-gold-soft transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full text-white/90 hover:bg-white/10 transition-colors"
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-deep-blue/98 backdrop-blur-md border-t border-white/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-white/90 hover:text-gold-soft rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
