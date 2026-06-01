import type { Song } from './supabase'

export const HYMNS_SOURCE = {
  name: 'Himnos y Cánticos del Evangelio',
  indexUrl: 'https://www.himnosycanticosdelevangelio.org/himnos/',
  siteUrl: 'https://www.himnosycanticosdelevangelio.org',
} as const

export interface HymnCatalogEntry {
  id: string
  number: number
  title: string
  displayTitle: string
  url: string
  category: string
  author: string
  key: string
}

export interface HymnsCatalog {
  source: string
  sourceName: string
  hymns: HymnCatalogEntry[]
}

const LYRICS_CACHE_KEY = 'mantos-hymns-lyrics-cache'

function lyricsCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(LYRICS_CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveLyricsCache(id: string, lyrics: string) {
  const cache = lyricsCache()
  cache[id] = lyrics
  localStorage.setItem(LYRICS_CACHE_KEY, JSON.stringify(cache))
}

export function getCachedLyrics(id: string): string | null {
  return lyricsCache()[id] ?? null
}

export async function loadHymnsCatalog(): Promise<HymnCatalogEntry[]> {
  const res = await fetch('/data/hymns-catalog.json')
  if (!res.ok) throw new Error('No se pudo cargar el himnario')
  const data = (await res.json()) as HymnsCatalog
  return data.hymns
}

export function hymnToSong(entry: HymnCatalogEntry, lyrics = ''): Song {
  return {
    id: entry.id,
    title: entry.displayTitle,
    lyrics: lyrics || 'Cargando letra…',
    key: entry.key,
    author: entry.author,
    category: 'Himnos',
    source_url: entry.url,
    hymn_number: entry.number,
  }
}

function parseLyricsFromHtml(html: string): string {
  const editor = html.match(
    /<div class="elementor-text-editor elementor-clearfix">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i
  )
  if (editor) return stripHtml(editor[1])

  const section = html.match(/## Himno\s*([\s\S]*?)(?=## Demo|## Compartir|<footer)/i)
  if (section) return stripHtml(section[1])

  return ''
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#8211;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n\n')
}

function proxyUrl(absoluteUrl: string): string {
  const path = absoluteUrl.replace(HYMNS_SOURCE.siteUrl, '')
  return `/hymns-proxy${path}`
}

export async function fetchHymnLyrics(entry: HymnCatalogEntry): Promise<string> {
  const cached = getCachedLyrics(entry.id)
  if (cached) return cached

  const urls = [proxyUrl(entry.url), entry.url]

  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (!res.ok) continue
      const html = await res.text()
      const lyrics = parseLyricsFromHtml(html)
      if (lyrics) {
        saveLyricsCache(entry.id, lyrics)
        return lyrics
      }
    } catch {
      /* intentar siguiente URL */
    }
  }

  return 'No se pudo cargar la letra aquí. Usa el botón para ver el himno en el sitio oficial.'
}
