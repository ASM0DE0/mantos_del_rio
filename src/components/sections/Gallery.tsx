import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { supabase, isSupabaseConfigured, type GalleryItem } from '@/lib/supabase'
import { MOCK_GALLERY } from '@/lib/mockData'

const FILTERS = ['todos', 'cultos', 'actividades', 'bautismos', 'campañas', 'videos']

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filter, setFilter] = useState('todos')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
        if (data?.length) {
          setItems(data as GalleryItem[])
          return
        }
      }
      setItems(MOCK_GALLERY)
    }
    load()
  }, [])

  const filtered =
    filter === 'todos' ? items : items.filter((i) => i.category === filter || (filter === 'videos' && i.type === 'video'))

  return (
    <section id="galeria" className="py-20 md:py-28 px-4 sm:px-6 bg-white/50 dark:bg-deep-navy/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Galería Multimedia" subtitle="Momentos de adoración, comunidad y fe." />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                filter === f ? 'bg-gold-soft text-deep-blue' : 'glass-panel'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightbox(item)}
              className="break-inside-avoid w-full rounded-2xl overflow-hidden glass-panel p-0 group text-left"
            >
              <div className="relative">
                <img src={item.url} alt={item.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                {item.type === 'video' && (
                  <span className="absolute inset-0 flex items-center justify-center bg-deep-blue/30">
                    <Play className="text-white" size={40} fill="white" />
                  </span>
                )}
              </div>
              <p className="p-3 text-sm font-medium text-deep-blue dark:text-white">{item.title}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-blue/95"
              onClick={() => setLightbox(null)}
            >
              <button
                type="button"
                className="absolute top-4 right-4 p-2 text-white hover:text-gold-soft"
                onClick={() => setLightbox(null)}
                aria-label="Cerrar"
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={lightbox.url}
                alt={lightbox.title}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
