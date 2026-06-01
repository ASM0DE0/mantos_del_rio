/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_CHURCH_WHATSAPP: string
  readonly VITE_YOUTUBE_CHANNEL_ID: string
  readonly VITE_GOOGLE_MAPS_EMBED: string
  readonly VITE_ADMIN_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
