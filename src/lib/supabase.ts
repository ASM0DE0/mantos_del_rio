import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { SongCategory } from './constants'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && key)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, key!)
  : null

export interface ChurchEvent {
  id: string
  title: string
  description: string
  start: string
  end?: string
  location: string
  category: string
}

export interface Song {
  id: string
  title: string
  lyrics: string
  key: string
  author: string
  chords?: string
  category: SongCategory
  audio_url?: string
  youtube_url?: string
  source_url?: string
  hymn_number?: number
}

export interface PrayerRequest {
  id?: string
  name: string
  request: string
  is_anonymous: boolean
  created_at?: string
}

export interface GalleryItem {
  id: string
  title: string
  url: string
  type: 'image' | 'video'
  category: string
}

export interface Announcement {
  id: string
  title: string
  message: string
  active: boolean
  expires_at?: string
}
