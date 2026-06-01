import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

interface ParticleBackgroundProps {
  enabled?: boolean
}

export function ParticleBackground({ enabled = true }: ParticleBackgroundProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [enabled])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 40, density: { enable: true } },
        color: { value: ['#d4af37', '#ffffff', '#f0d78c'] },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 0.6, direction: 'top' as const },
        links: { enable: true, distance: 120, opacity: 0.15, color: '#d4af37' },
      },
      detectRetina: true,
    }),
    []
  )

  if (!enabled || !ready) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <Particles id="church-particles" className="absolute inset-0 h-full w-full" options={options} />
    </div>
  )
}
