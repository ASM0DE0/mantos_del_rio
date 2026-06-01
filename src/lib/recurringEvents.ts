import type { ChurchEvent } from './supabase'

const LOCATION = 'Mantos del Río, Talca'

/** Domingo 17:30, martes y jueves 20:00 */
const WORSHIP_SCHEDULE = [
  { dayOfWeek: 0, hour: 17, minute: 30, dayLabel: 'Domingo' },
  { dayOfWeek: 2, hour: 20, minute: 0, dayLabel: 'Martes' },
  { dayOfWeek: 4, hour: 20, minute: 0, dayLabel: 'Jueves' },
] as const

const DURATION_HOURS = 2
const MONTHS_AHEAD = 6
const MONTHS_BACK = 1

function addHours(date: Date, hours: number): Date {
  const d = new Date(date)
  d.setTime(d.getTime() + hours * 60 * 60 * 1000)
  return d
}

/** Genera cultos de adoración recurrentes para el calendario */
export function generateRecurringWorshipEvents(): ChurchEvent[] {
  const events: ChurchEvent[] = []
  const rangeStart = new Date()
  rangeStart.setMonth(rangeStart.getMonth() - MONTHS_BACK)
  rangeStart.setHours(0, 0, 0, 0)

  const rangeEnd = new Date()
  rangeEnd.setMonth(rangeEnd.getMonth() + MONTHS_AHEAD)
  rangeEnd.setHours(23, 59, 59, 999)

  const cursor = new Date(rangeStart)

  while (cursor <= rangeEnd) {
    for (const slot of WORSHIP_SCHEDULE) {
      if (cursor.getDay() !== slot.dayOfWeek) continue

      const start = new Date(cursor)
      start.setHours(slot.hour, slot.minute, 0, 0)
      const end = addHours(start, DURATION_HOURS)
      const dateKey = start.toISOString().slice(0, 10)

      events.push({
        id: `worship-${dateKey}-${slot.dayOfWeek}`,
        title: 'Culto de adoración',
        description: `Culto de adoración — ${slot.dayLabel}, ${formatTime(slot.hour, slot.minute)}`,
        start: start.toISOString(),
        end: end.toISOString(),
        location: LOCATION,
        category: 'culto',
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return events.sort((a, b) => a.start.localeCompare(b.start))
}

/** Próximo culto de adoración (para contador en portada) */
export function getNextWorshipService(): Date | null {
  const now = new Date()
  const upcoming = generateRecurringWorshipEvents()
    .map((e) => new Date(e.start))
    .filter((d) => d > now)
    .sort((a, b) => a.getTime() - b.getTime())
  return upcoming[0] ?? null
}

function formatTime(hour: number, minute: number): string {
  const h = hour % 12 || 12
  const ampm = hour < 12 ? 'AM' : 'PM'
  const m = minute.toString().padStart(2, '0')
  return `${h}:${m} ${ampm}`
}
