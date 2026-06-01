import { useMemo } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { AmbientAudio } from '@/components/ui/AmbientAudio'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { EventsCalendar } from '@/components/sections/EventsCalendar'
import { HymnsDatabase } from '@/components/sections/HymnsDatabase'
import { VerseOfDay } from '@/components/sections/VerseOfDay'
import { LiveStreams } from '@/components/sections/LiveStreams'
import { PrayerRequests } from '@/components/sections/PrayerRequests'
import { Gallery } from '@/components/sections/Gallery'
import { Contact } from '@/components/sections/Contact'
import { Admin } from '@/pages/Admin'
import { useTheme } from '@/hooks/useTheme'
import { CHURCH } from '@/lib/constants'
import { getNextWorshipService } from '@/lib/recurringEvents'

function HomePage({ dark, onToggleTheme }: { dark: boolean; onToggleTheme: () => void }) {
  const nextService = useMemo(() => getNextWorshipService(), [])

  return (
    <>
      <Helmet>
        <title>{CHURCH.name} | Comunidad de Fe</title>
        <meta name="description" content={CHURCH.tagline} />
        <meta property="og:title" content={CHURCH.name} />
        <meta property="og:description" content={CHURCH.tagline} />
      </Helmet>
      <Navbar dark={dark} onToggleTheme={onToggleTheme} />
      <main>
        <Hero nextServiceDate={nextService} />
        <About />
        <EventsCalendar />
        <HymnsDatabase />
        <VerseOfDay />
        <LiveStreams />
        <PrayerRequests />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AmbientAudio />
    </>
  )
}

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className={dark ? 'dark' : ''}>
          <Routes>
            <Route path="/" element={<HomePage dark={dark} onToggleTheme={toggle} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
