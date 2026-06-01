import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookMarked, RefreshCw } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getVerseOfDay, getRandomVerse, type BibleVerse } from '@/lib/bibleVerses'

export function VerseOfDay() {
  const [verse, setVerse] = useState<BibleVerse>(() => getVerseOfDay())
  const [key, setKey] = useState(0)

  const showAnother = () => {
    setVerse((v) => getRandomVerse(v))
    setKey((k) => k + 1)
  }

  return (
    <section id="versiculo" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-soft/5 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative">
        <SectionHeader title="Versículo del Día" subtitle="Palabra viva para tu jornada. Se renueva cada día." />

        <div className="glass-panel p-8 md:p-12 text-center border-gold-soft/30 shadow-gold">
          <BookMarked className="mx-auto text-gold-soft mb-6" size={40} aria-hidden />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-deep-blue dark:text-white leading-relaxed italic mb-8">
                "{verse.text}"
              </p>
              <footer className="text-gold-soft font-semibold">
                {verse.book} {verse.chapter}:{verse.verse}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <button type="button" onClick={showAnother} className="btn-primary mt-8">
            <RefreshCw size={18} /> Mostrar otro versículo
          </button>
        </div>
      </div>
    </section>
  )
}
