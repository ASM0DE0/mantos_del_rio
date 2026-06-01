import { useEffect, useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import type { EventClickArg, EventInput } from '@fullcalendar/core'
import { CalendarPlus, MapPin, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { EVENT_CATEGORIES } from '@/lib/constants'
import { supabase, isSupabaseConfigured, type ChurchEvent } from '@/lib/supabase'
import { MOCK_EVENTS } from '@/lib/mockData'

export function EventsCalendar() {
  const [events, setEvents] = useState<ChurchEvent[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<ChurchEvent | null>(null)
  const [view, setView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth')

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.from('events').select('*').order('start', { ascending: true })
        if (data?.length) {
          setEvents(data as ChurchEvent[])
          return
        }
      }
      setEvents(MOCK_EVENTS)
    }
    load()
  }, [])

  const filtered = useMemo(
    () => (filter === 'all' ? events : events.filter((e) => e.category === filter)),
    [events, filter]
  )

  const fcEvents: EventInput[] = filtered.map((e) => {
    const cat = EVENT_CATEGORIES.find((c) => c.id === e.category)
    return {
      id: e.id,
      title: e.title,
      start: e.start,
      end: e.end,
      backgroundColor: cat?.color ?? '#d4af37',
      borderColor: cat?.color ?? '#d4af37',
      extendedProps: e,
    }
  })

  const handleEventClick = (info: EventClickArg) => {
    setSelected(info.event.extendedProps as ChurchEvent)
  }

  const addToCalendar = (event: ChurchEvent) => {
    const start = new Date(event.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const end = event.end
      ? new Date(event.end).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      : start
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
    window.open(url, '_blank')
  }

  return (
    <section id="eventos" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Calendario de Eventos"
          subtitle="Culto de adoración: domingos 17:30, martes y jueves 20:00."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')} label="Cultos de adoración" />
        </div>

        <div className="flex justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setView('dayGridMonth')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              view === 'dayGridMonth' ? 'bg-gold-soft text-deep-blue' : 'glass-panel text-deep-blue dark:text-white'
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setView('timeGridWeek')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              view === 'timeGridWeek' ? 'bg-gold-soft text-deep-blue' : 'glass-panel text-deep-blue dark:text-white'
            }`}
          >
            Semanal
          </button>
        </div>

        <GlassCard className="p-4 md:p-6 overflow-hidden">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            key={view}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            locale={esLocale}
            events={fcEvents}
            eventClick={handleEventClick}
            height="auto"
            aspectRatio={1.5}
          />
        </GlassCard>

        {selected && (
          <GlassCard className="mt-6 max-w-xl mx-auto">
            <h3 className="font-display text-xl font-bold text-deep-blue dark:text-white mb-3">{selected.title}</h3>
            <p className="text-deep-navy/80 dark:text-white/75 mb-4">{selected.description}</p>
            <div className="flex flex-col gap-2 text-sm mb-4">
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-gold-soft" />
                {new Date(selected.start).toLocaleString('es')}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-gold-soft" />
                {selected.location}
              </span>
            </div>
            <button type="button" onClick={() => addToCalendar(selected)} className="btn-primary w-full sm:w-auto">
              <CalendarPlus size={18} /> Agregar al calendario
            </button>
          </GlassCard>
        )}
      </div>
    </section>
  )
}

function FilterBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active ? 'bg-deep-blue text-white dark:bg-gold-soft dark:text-deep-blue' : 'glass-panel'
      }`}
    >
      {label}
    </button>
  )
}
