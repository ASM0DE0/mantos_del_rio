import type { Song, GalleryItem, Announcement } from './supabase'
import { generateRecurringWorshipEvents } from './recurringEvents'

export const MOCK_EVENTS = generateRecurringWorshipEvents()

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Santo, Santo, Santo',
    lyrics: 'Santo, santo, santo\nSeñor Dios omnipotente...\nTemprano en la mañana\nNuestro canto elevaré.',
    key: 'G',
    author: 'Reginald Heber',
    category: 'Himnos',
    youtube_url: 'https://www.youtube.com/@impchmantosdelrio1696',
  },
  {
    id: '2',
    title: 'Hay Libertad',
    lyrics: 'Hay libertad en Tu presencia\nQuebrantando cadenas...',
    key: 'D',
    author: 'Generación 12',
    category: 'Alabanzas',
    chords: 'D | G | Bm | A',
  },
  {
    id: '3',
    title: 'Jehová es mi Pastor',
    lyrics: 'Jehová es mi pastor, nada me faltará...',
    key: 'C',
    author: 'Salmo 23',
    category: 'Coros',
  },
]

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Culto de adoración',
    url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    type: 'image',
    category: 'cultos',
  },
  {
    id: '2',
    title: 'Bautismo',
    url: 'https://images.unsplash.com/photo-1507692049790-5928b299002a?w=800',
    type: 'image',
    category: 'bautismos',
  },
  {
    id: '3',
    title: 'Comunidad',
    url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265bc?w=800',
    type: 'image',
    category: 'actividades',
  },
  {
    id: '4',
    title: 'Campaña juvenil',
    url: 'https://images.unsplash.com/photo-1511632365735-7b051f4a4fbb?w=800',
    type: 'image',
    category: 'campañas',
  },
]

export const MOCK_ANNOUNCEMENTS: Announcement[] = []
