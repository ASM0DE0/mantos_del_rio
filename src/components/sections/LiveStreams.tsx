import { motion } from 'framer-motion'
import { ExternalLink, Play, Radio, Youtube } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { CHURCH, YOUTUBE_CHANNEL_URL } from '@/lib/constants'

const RECENT_VIDEOS = [
  {
    id: '1',
    title: 'Ver todos los cultos en YouTube',
    thumb: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=640',
    href: CHURCH.youtube.videos,
  },
  {
    id: '2',
    title: 'Transmisión en vivo',
    thumb: 'https://images.unsplash.com/photo-1507692049790-5928b299002a?w=640',
    href: CHURCH.youtube.live,
  },
  {
    id: '3',
    title: 'Canal Mantos del Río',
    thumb: 'https://images.unsplash.com/photo-1511632365735-7b051f4a4fbb?w=640',
    href: YOUTUBE_CHANNEL_URL,
  },
]

export function LiveStreams() {
  return (
    <section id="transmisiones" className="py-20 md:py-28 px-4 sm:px-6 bg-white/50 dark:bg-deep-navy/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Transmisiones en Vivo"
          subtitle="Únete a nuestros cultos en vivo y revive las grabaciones en nuestro canal de YouTube."
        />

        <GlassCard className="mb-6 p-0 overflow-hidden">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video w-full bg-deep-blue group"
          >
            <img
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1280&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
              <span className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Youtube size={40} fill="currentColor" />
              </span>
              <span className="font-display text-xl md:text-2xl font-semibold text-center px-4">
                Ver canal en YouTube
              </span>
              <span className="text-sm text-white/80">@impchmantosdelrio1696</span>
            </div>
          </a>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-deep-blue/90 text-white text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Radio size={16} className="text-red-400 animate-pulse" aria-hidden />
              Mantos del Río en YouTube
            </span>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-soft hover:text-gold-light transition-colors"
            >
              Abrir canal
              <ExternalLink size={14} />
            </a>
          </div>
        </GlassCard>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a href={CHURCH.youtube.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Radio size={18} /> Ver en vivo en YouTube
          </a>
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline text-deep-blue dark:text-white border-deep-blue/30 dark:border-white/30">
            <Youtube size={18} /> Ir al canal
          </a>
        </div>

        <h3 className="font-display text-2xl font-semibold text-deep-blue dark:text-white mb-6 text-center">
          Más en nuestro canal
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECENT_VIDEOS.map((video, i) => (
            <motion.a
              key={video.id}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-panel overflow-hidden p-0 hover:shadow-gold transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumb}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-deep-blue/40 group-hover:bg-deep-blue/20 transition-colors">
                  <span className="w-14 h-14 rounded-full bg-gold-soft flex items-center justify-center text-deep-blue">
                    <Play size={24} fill="currentColor" />
                  </span>
                </div>
              </div>
              <p className="p-4 font-medium text-deep-blue dark:text-white">{video.title}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
