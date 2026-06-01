import { motion } from 'framer-motion'
import { Calendar, Radio, Heart } from 'lucide-react'
import { CHURCH, YOUTUBE_CHANNEL_URL } from '@/lib/constants'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { useCountdown } from '@/hooks/useCountdown'

interface HeroProps {
  nextServiceDate: Date | null
}

export function Hero({ nextServiceDate }: HeroProps) {
  const countdown = useCountdown(nextServiceDate)

  const slides = [
    'https://images.unsplash.com/photo-1507692049790-5928b299002a?w=1920&q=80',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80',
    'https://images.unsplash.com/photo-1511632365735-7b051f4a4fbb?w=1920&q=80',
  ]

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[shimmer_20s_ease-in-out_infinite]"
        style={{
          backgroundImage: `url(${slides[0]})`,
        }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        poster={slides[0]}
        aria-hidden
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-people-holding-hands-in-a-circle-4373-large.mp4"
          type="video/mp4"
        />
      </video>
      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold-light font-medium tracking-widest uppercase text-sm mb-4"
        >
          Talca, Región del Maule · Bienvenidos
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          {CHURCH.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-white/90 italic max-w-3xl mx-auto mb-10"
        >
          {CHURCH.heroQuote}
        </motion.p>

        {nextServiceDate && !countdown.done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-panel inline-flex flex-wrap justify-center gap-4 md:gap-6 px-6 py-4 mb-10"
          >
            <span className="text-gold-soft text-sm w-full">Próximo culto en:</span>
            {[
              ['Días', countdown.days],
              ['Horas', countdown.hours],
              ['Min', countdown.minutes],
              ['Seg', countdown.seconds],
            ].map(([label, value]) => (
              <div key={String(label)} className="text-center min-w-[60px]">
                <div className="text-2xl md:text-3xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                <div className="text-xs text-white/70">{label}</div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
        >
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Radio size={18} /> Ver transmisiones
          </a>
          <a href="#eventos" className="btn-outline">
            <Calendar size={18} /> Próximos cultos
          </a>
          <a href="#oracion" className="btn-outline">
            <Heart size={18} /> Peticiones de oración
          </a>
        </motion.div>
      </div>
    </section>
  )
}
