export interface BibleVerse {
  text: string
  book: string
  chapter: number
  verse: number
}

/** Muestra representativa de versículos populares. En producción, cargar JSON completo (~4000). */
export const BIBLE_VERSES: BibleVerse[] = [
  { text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.', book: 'Juan', chapter: 3, verse: 16 },
  { text: 'Todo lo puedo en Cristo que me fortalece.', book: 'Filipenses', chapter: 4, verse: 13 },
  { text: 'El Señor es mi pastor; nada me faltará.', book: 'Salmos', chapter: 23, verse: 1 },
  { text: 'Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia.', book: 'Proverbios', chapter: 3, verse: 5 },
  { text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.', book: 'Mateo', chapter: 6, verse: 33 },
  { text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.', book: 'Isaías', chapter: 41, verse: 10 },
  { text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.', book: 'Romanos', chapter: 8, verse: 28 },
  { text: 'Jehová es mi fortaleza y mi escudo; en él confió mi corazón, y fui ayudado.', book: 'Salmos', chapter: 28, verse: 7 },
  { text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.', book: 'Mateo', chapter: 11, verse: 28 },
  { text: 'Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.', book: 'Mateo', chapter: 18, verse: 20 },
  { text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.', book: 'Salmos', chapter: 91, verse: 1 },
  { text: 'Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos.', book: 'Hebreos', chapter: 4, verse: 12 },
  { text: 'Encomienda a Jehová tu camino, y confía en él; y él hará.', book: 'Salmos', chapter: 37, verse: 5 },
  { text: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.', book: 'Gálatas', chapter: 5, verse: 22 },
  { text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.', book: '2 Timoteo', chapter: 1, verse: 7 },
  { text: 'El que cree en el Hijo tiene vida eterna; pero el que rehúsa creer en el Hijo no verá la vida.', book: 'Juan', chapter: 3, verse: 36 },
  { text: 'Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro.', book: 'Romanos', chapter: 6, verse: 23 },
  { text: 'Porque la gracia de Dios se ha manifestado para salvación a todos los hombres.', book: 'Tito', chapter: 2, verse: 11 },
  { text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.', book: 'Efesios', chapter: 2, verse: 8 },
  { text: 'Porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.', book: 'Hechos', chapter: 4, verse: 12 },
  { text: 'El Señor peleará por vosotros, y vosotros estaréis tranquilos.', book: 'Éxodo', chapter: 14, verse: 14 },
  { text: 'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.', book: 'Jeremías', chapter: 33, verse: 3 },
  { text: 'Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos, dijo Jehová.', book: 'Isaías', chapter: 55, verse: 8 },
  { text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal.', book: 'Jeremías', chapter: 29, verse: 11 },
  { text: 'Porque la vida eterna es esta: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien has enviado.', book: 'Juan', chapter: 17, verse: 3 },
]

const DAY_KEY = 'verse-of-day-index'
const DAY_DATE_KEY = 'verse-of-day-date'

export function getVerseOfDay(): BibleVerse {
  const today = new Date().toDateString()
  const storedDate = localStorage.getItem(DAY_DATE_KEY)
  let index = parseInt(localStorage.getItem(DAY_KEY) || '0', 10)

  if (storedDate !== today) {
    index = Math.floor(Math.random() * BIBLE_VERSES.length)
    localStorage.setItem(DAY_KEY, String(index))
    localStorage.setItem(DAY_DATE_KEY, today)
  }

  return BIBLE_VERSES[index % BIBLE_VERSES.length]
}

export function getRandomVerse(exclude?: BibleVerse): BibleVerse {
  let verse: BibleVerse
  do {
    verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)]
  } while (exclude && verse.text === exclude.text && BIBLE_VERSES.length > 1)
  return verse
}
