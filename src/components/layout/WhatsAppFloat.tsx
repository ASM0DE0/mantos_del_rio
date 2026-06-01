import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { CHURCH } from '@/lib/constants'

export function WhatsAppFloat() {
  const url = `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent('¡Paz! Me gustaría obtener más información sobre Mantos del Río en Talca.')}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </motion.a>
  )
}
