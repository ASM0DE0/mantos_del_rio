import { motion } from 'framer-motion'

interface SectionHeaderProps {
  id?: string
  title: string
  subtitle?: string
}

export function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.header
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="section-title mb-4">{title}</h2>
      {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
      <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
    </motion.header>
  )
}
