import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

export function AmbientAudio() {
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    setPlaying((p) => !p)
    // Opcional: enlazar a archivo de audio en /public/ambient.mp3
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-24 right-6 z-40 p-3 rounded-full glass-panel text-gold-soft hover:scale-105 transition-transform"
      aria-label={playing ? 'Silenciar música ambiental' : 'Activar música ambiental'}
      title="Música ambiental (opcional)"
    >
      {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}
