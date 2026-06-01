import { BookOpen, Eye, Target, User } from 'lucide-react'
import { CHURCH } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'

const cards = [
  { icon: BookOpen, title: 'Nuestra historia', content: CHURCH.history },
  { icon: Eye, title: 'Visión', content: CHURCH.vision },
  { icon: Target, title: 'Misión', content: CHURCH.mission },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 px-4 sm:px-6 bg-white/50 dark:bg-deep-navy/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Sobre Mantos del Río"
          subtitle="Nuestra historia, propósito y el corazón que nos guía en Cristo, en Talca."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => (
            <GlassCard key={card.title} delay={i * 0.1}>
              <CardIcon icon={card.icon} />
              <h3 className="font-display text-xl font-semibold text-deep-blue dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-deep-navy/80 dark:text-white/75 leading-relaxed">{card.content}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <img
            src={CHURCH.pastor.image}
            alt={`Pastor ${CHURCH.pastor.name}`}
            className="w-48 h-48 rounded-2xl object-cover border-2 border-gold-soft/40 shadow-gold"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-gold-soft mb-2">
              <User size={20} />
              <span className="text-sm font-medium uppercase tracking-wide">{CHURCH.pastor.title}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-deep-blue dark:text-white mb-3">
              {CHURCH.pastor.name}
            </h3>
            <p className="text-deep-navy/80 dark:text-white/75 leading-relaxed">{CHURCH.pastor.bio}</p>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}

function CardIcon({ icon: Icon }: { icon: typeof BookOpen }) {
  return (
    <div className="w-14 h-14 rounded-xl bg-gold-soft/20 flex items-center justify-center text-gold-soft mb-4 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
  )
}
