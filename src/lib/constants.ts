/** Canal oficial de YouTube */
import pastorImg from '../assets/pastor.luis.jpg'

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@impchmantosdelrio1696'

export const CHURCH = {
  name: 'Mantos del Río',
  shortName: 'Mantos del Río',
  logoInitials: 'MR',
  tagline:
    'Iglesia cristiana en Talca — Una familia en Cristo, una esperanza para el mundo',

  heroQuote:
    '"Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos." — Mateo 18:20',

  pastor: {
    name: 'Luis Valdes',
    title: 'Pastor principal',
    bio:
      'Pastor Luis Valdes lidera Mantos del Río en Talca con pasión por el evangelio, formando discípulos y sirviendo a la comunidad del Maule con amor y dedicación.',
    image: pastorImg,
  },

  history:
    'Mantos del Río es una comunidad de fe en Talca, Región del Maule, comprometida con la adoración, la palabra de Dios y el servicio a las familias de nuestra ciudad.',

  vision:
    'Ser una iglesia que cubra a la comunidad con el amor de Cristo, como mantos de agua viva que refrescan y restauran vidas.',

  mission:
    'Predicar el evangelio, adorar en espíritu y verdad, servir con amor en Talca y levantar generaciones firmes en la fe.',

  address: 'Calle Nueve Ote., Talca, Maule, Chile',
  locationCode: 'G8XQ+HX Talca',

  phone: '+56 9 7360 9002',

  schedule: [
    { day: 'Domingo', time: '5:30 PM — Culto de adoración' },
    { day: 'Martes', time: '8:00 PM — Culto de adoración' },
    { day: 'Jueves', time: '8:00 PM — Culto de adoración' },
  ],

  social: {
    facebook: 'https://www.facebook.com/share/196voRGBP8/',
    instagram: 'https://www.instagram.com/impchmantosdelrio/',
    youtube: YOUTUBE_CHANNEL_URL,
  },

  youtube: {
    channel: YOUTUBE_CHANNEL_URL,
    videos: `${YOUTUBE_CHANNEL_URL}/videos`,
    live: `${YOUTUBE_CHANNEL_URL}/live`,
    handle: 'impchmantosdelrio1696',
  },

  whatsapp: import.meta.env.VITE_CHURCH_WHATSAPP || '56973609002',

  mapsEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    'https://maps.google.com/maps?q=G8XQ%2BHX+Talca,+Chile&hl=es&z=17&output=embed',

  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=G8XQ%2BHX+Talca,+Chile',

  youtubeChannelId: import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '',
}

export const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#himnos', label: 'Himnario' },
  { href: '#versiculo', label: 'Versículo' },
  { href: '#transmisiones', label: 'En vivo' },
  { href: '#oracion', label: 'Oración' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

export const EVENT_CATEGORIES = [
  { id: 'culto', label: 'Cultos', color: '#d4af37' },
  { id: 'vigilia', label: 'Vigilias', color: '#6366f1' },
  { id: 'campana', label: 'Campañas', color: '#ec4899' },
  { id: 'actividad', label: 'Actividades', color: '#22c55e' },
]

export const SONG_CATEGORIES = ['Himnos', 'Coros', 'Alabanzas', 'Especiales'] as const

export type SongCategory = (typeof SONG_CATEGORIES)[number]
