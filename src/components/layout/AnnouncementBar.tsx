import { motion } from 'framer-motion'
import { Megaphone, X } from 'lucide-react'
import { useState } from 'react'
import type { Announcement } from '@/lib/supabase'

interface AnnouncementBarProps {
  announcements: Announcement[]
}

export function AnnouncementBar({ announcements }: AnnouncementBarProps) {
  const active = announcements.filter((a) => a.active)[0]
  const [dismissed, setDismissed] = useState(false)

  if (!active || dismissed) return null

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gold-soft text-deep-blue py-2 px-4 flex items-center justify-center gap-3 text-sm font-medium"
      role="status"
    >
      <Megaphone size={18} aria-hidden />
      <span>
        <strong>{active.title}:</strong> {active.message}
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-2 p-1 hover:bg-deep-blue/10 rounded"
        aria-label="Cerrar anuncio"
      >
        <X size={16} />
      </button>
    </motion.div>
  )
}
