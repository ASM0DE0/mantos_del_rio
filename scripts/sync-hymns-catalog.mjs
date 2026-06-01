/**

 * Descarga el índice de himnos y genera public/data/hymns-catalog.json

 * Fuente: https://www.himnosycanticosdelevangelio.org/himnos/

 */

import { writeFileSync, mkdirSync } from 'node:fs'

import { dirname, join } from 'node:path'

import { fileURLToPath } from 'node:url'



const INDEX_URL = 'https://www.himnosycanticosdelevangelio.org/himnos/'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'hymns-catalog.json')



function decodeHtml(s) {

  return s

    .replace(/&#8211;/g, '–')

    .replace(/&#8212;/g, '—')

    .replace(/&amp;/g, '&')

    .replace(/&quot;/g, '"')

    .replace(/&#039;/g, "'")

    .replace(/&lt;/g, '<')

    .replace(/&gt;/g, '>')

}



function parseIndex(html) {

  const items = []

  const re =

    /<a href="(https:\/\/www\.himnosycanticosdelevangelio\.org\/himnos\/(\d+)-[^"]+)">\s*([\s\S]*?)<\/a>/gi

  let m

  while ((m = re.exec(html)) !== null) {

    const number = parseInt(m[2], 10)

    let rawTitle = decodeHtml(m[3].replace(/\s+/g, ' ').trim())

    const title = rawTitle.replace(/^\d+\s*[–-]\s*/, '').trim()

    items.push({

      number,

      title: title || `Himno ${number}`,

      url: m[1],

    })

  }

  const byNum = new Map()

  for (const item of items) {

    if (!byNum.has(item.number)) byNum.set(item.number, item)

  }

  return [...byNum.values()].sort((a, b) => a.number - b.number)

}



async function main() {

  if (process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {

    console.warn('Tip: si falla SSL, ejecuta con NODE_TLS_REJECT_UNAUTHORIZED=0')

  }

  console.log('Fetching index...')

  const res = await fetch(INDEX_URL, {

    headers: { 'User-Agent': 'MantosDelRio-HymnSync/1.0' },

  })

  if (!res.ok) throw new Error(`Index HTTP ${res.status}`)

  const hymns = parseIndex(await res.text())

  console.log(`Found ${hymns.length} hymns`)

  if (!hymns.length) throw new Error('No se encontraron himnos en el HTML')



  const catalog = {

    source: INDEX_URL,

    sourceName: 'Himnos y Cánticos del Evangelio',

    sourceSite: 'https://www.himnosycanticosdelevangelio.org',

    updatedAt: new Date().toISOString(),

    hymns: hymns.map((h) => ({

      id: `hymn-${String(h.number).padStart(3, '0')}`,

      number: h.number,

      title: h.title,

      displayTitle: `${String(h.number).padStart(3, '0')} – ${h.title}`,

      url: h.url,

      category: 'Himnos',

      author: 'Himnos y Cánticos del Evangelio',

      key: '—',

    })),

  }



  mkdirSync(dirname(OUT), { recursive: true })

  writeFileSync(OUT, JSON.stringify(catalog, null, 2), 'utf8')

  console.log('Wrote', OUT)

}



main().catch((e) => {

  console.error(e)

  process.exit(1)

})


