import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, Printer, Share2, Music, ExternalLink, Loader2 } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { SONG_CATEGORIES, type SongCategory } from '@/lib/constants'
import { supabase, isSupabaseConfigured, type Song } from '@/lib/supabase'
import {
  HYMNS_SOURCE,
  loadHymnsCatalog,
  fetchHymnLyrics,
  hymnToSong,
  type HymnCatalogEntry,
} from '@/lib/hymnsSource'

const FAVORITES_KEY = 'church-song-favorites'
const PAGE_SIZE = 60

export function HymnsDatabase() {
  const [catalog, setCatalog] = useState<HymnCatalogEntry[]>([])
  const [catalogError, setCatalogError] = useState('')
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SongCategory | 'all'>('Himnos')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState<Song | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<HymnCatalogEntry | null>(null)
  const [lyricsLoading, setLyricsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      setCatalogLoading(true)
      setCatalogError('')
      try {
        if (isSupabaseConfigured && supabase) {
          const { data } = await supabase.from('songs').select('*').order('title')
          if (data?.length) {
            if (!cancelled) {
              setCatalog(
                data.map((s) => ({
                  id: s.id,
                  number: s.hymn_number ?? 0,
                  title: s.title,
                  displayTitle: s.title,
                  url: s.source_url || HYMNS_SOURCE.indexUrl,
                  category: s.category,
                  author: s.author,
                  key: s.key,
                }))
              )
            }
            return
          }
        }
        const hymns = await loadHymnsCatalog()
        if (!cancelled) setCatalog(hymns)
      } catch {
        if (!cancelled) setCatalogError('No se pudo cargar el himnario. Recarga la página.')
      } finally {
        if (!cancelled) setCatalogLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return catalog.filter((h) => {
      const matchCat = category === 'all' || h.category === category
      const numStr = String(h.number).padStart(3, '0')
      const matchQ =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.displayTitle.toLowerCase().includes(q) ||
        numStr.includes(q)
      return matchCat && matchQ
    })
  }, [catalog, query, category])

  const visible = filtered.slice(0, visibleCount)

  const openHymn = useCallback(async (entry: HymnCatalogEntry) => {
    setSelectedEntry(entry)
    setSelected(hymnToSong(entry))
    setLyricsLoading(true)
    try {
      const lyrics = await fetchHymnLyrics(entry)
      setSelected(hymnToSong(entry, lyrics))
    } finally {
      setLyricsLoading(false)
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }

  const printSong = (song: Song) => {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(
      `<html><head><title>${song.title}</title></head><body><h1>${song.title}</h1><p><em>${song.author}</em></p><pre style="font-family:sans-serif;white-space:pre-wrap">${song.lyrics}</pre><p><small>Fuente: ${HYMNS_SOURCE.name}</small></p></body></html>`
    )
    w.print()
  }

  const shareSong = async (song: Song) => {
    const text = `${song.title}\n\n${song.lyrics}\n\n${song.source_url || ''}`
    if (navigator.share) {
      await navigator.share({ title: song.title, text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Letra copiada al portapapeles')
    }
  }

  return (
    <section id="himnos" className="py-20 md:py-28 px-4 sm:px-6 bg-white/50 dark:bg-deep-navy/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Himnario y Coros"
          subtitle={`${catalog.length || 517} himnos de «${HYMNS_SOURCE.name}». Busca por número o título.`}
        />

        <p className="text-center text-sm text-deep-navy/70 dark:text-white/60 mb-6 -mt-8">
          Fuente:{' '}
          <a
            href={HYMNS_SOURCE.indexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-soft hover:underline"
          >
            himnosycanticosdelevangelio.org
          </a>
        </p>

        <div className="max-w-xl mx-auto relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft" size={20} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Buscar por número (ej. 117) o título..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass-panel text-deep-blue dark:text-white placeholder:text-deep-navy/50"
            aria-label="Buscar himnos"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <CatBtn active={category === 'Himnos'} onClick={() => setCategory('Himnos')} label="Himnos (517)" />
          {SONG_CATEGORIES.filter((c) => c !== 'Himnos').map((c) => (
            <CatBtn key={c} active={category === c} onClick={() => setCategory(c)} label={c} />
          ))}
        </div>

        {catalogLoading && (
          <p className="text-center text-deep-navy/70 dark:text-white/70 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={20} /> Cargando himnario…
          </p>
        )}
        {catalogError && <p className="text-center text-red-500">{catalogError}</p>}

        {!catalogLoading && !catalogError && (
          <>
            <p className="text-center text-sm text-deep-navy/60 dark:text-white/50 mb-4">
              Mostrando {visible.length} de {filtered.length} resultados
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map((entry, i) => (
                <GlassCard key={entry.id} delay={Math.min(i * 0.02, 0.3)} className="hover:border-gold-soft/50">
                  <button type="button" className="w-full text-left" onClick={() => openHymn(entry)}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs text-gold-soft font-medium">Himno {entry.number}</span>
                        <h3 className="font-display text-lg font-semibold text-deep-blue dark:text-white">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-deep-navy/70 dark:text-white/60">{entry.author}</p>
                      </div>
                      <Music className="text-gold-soft shrink-0" size={22} />
                    </div>
                  </button>
                </GlassCard>
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  className="btn-primary"
                >
                  Cargar más himnos
                </button>
              </div>
            )}
          </>
        )}

        <AnimatePresence>
          {selected && selectedEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-blue/80 backdrop-blur-sm"
              onClick={() => {
                setSelected(null)
                setSelectedEntry(null)
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9 }}
                className="glass-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="song-title"
              >
                <h3 id="song-title" className="font-display text-2xl font-bold text-deep-blue dark:text-white mb-2">
                  {selected.title}
                </h3>
                <p className="text-gold-soft text-sm mb-4">{selected.author}</p>

                {lyricsLoading ? (
                  <p className="flex items-center gap-2 text-deep-navy/80 dark:text-white/75 mb-6">
                    <Loader2 className="animate-spin" size={18} /> Cargando letra…
                  </p>
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-deep-navy/90 dark:text-white/85 leading-relaxed mb-6">
                    {selected.lyrics}
                  </pre>
                )}

                {selected.source_url && (
                  <a
                    href={selected.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline mb-4 inline-flex text-deep-blue dark:text-white border-deep-blue/30"
                  >
                    <ExternalLink size={18} /> Ver en {HYMNS_SOURCE.name}
                  </a>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(selected.id)}
                    className="btn-outline text-deep-blue dark:text-white border-deep-blue/30"
                  >
                    <Star size={18} fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} /> Favorito
                  </button>
                  <button
                    type="button"
                    onClick={() => printSong(selected)}
                    className="btn-outline text-deep-blue dark:text-white border-deep-blue/30"
                  >
                    <Printer size={18} /> Imprimir
                  </button>
                  <button
                    type="button"
                    onClick={() => shareSong(selected)}
                    className="btn-outline text-deep-blue dark:text-white border-deep-blue/30"
                  >
                    <Share2 size={18} /> Compartir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null)
                      setSelectedEntry(null)
                    }}
                    className="btn-primary ml-auto"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function CatBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        active ? 'bg-gold-soft text-deep-blue' : 'glass-panel'
      }`}
    >
      {label}
    </button>
  )
}
