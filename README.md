# Mantos del Río — Sitio Web

Sitio web moderno para iglesia cristiana: glassmorphism, animaciones con Framer Motion, calendario FullCalendar, himnario, versículo del día, transmisiones, oración y galería.

## Tecnologías

- React 18 + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (eventos, himnos, oración, galería)
- FullCalendar
- tsparticles

## Inicio rápido

```bash
cd "%USERPROFILE%\Desktop\cursor\mantos del rio"
npm install
cp .env.example .env
npm run dev
```

Abre http://localhost:5173

## Variables de entorno

Copia `.env.example` a `.env` y configura:

| Variable | Descripción |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima |
| `VITE_CHURCH_WHATSAPP` | Número WhatsApp (sin +) |
| `VITE_YOUTUBE_CHANNEL_ID` | ID del canal YouTube |
| `VITE_GOOGLE_MAPS_EMBED` | URL embed de Google Maps |
| `VITE_ADMIN_PASSWORD` | Contraseña panel `/admin` |

Sin Supabase, el sitio funciona con datos de demostración en memoria/localStorage.

## Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta `supabase/schema.sql` en el SQL Editor
3. Pega URL y anon key en `.env`

## Panel administrativo

Visita `/admin` para agregar y eliminar eventos (requiere Supabase configurado).

## Producción

```bash
npm run build
npm run preview
```

Despliega la carpeta `dist` en Vercel, Netlify o similar.

## Personalización

Edita `src/lib/constants.ts` con el nombre de la iglesia, pastor, horarios y redes sociales.

Para ~4000 versículos bíblicos, reemplaza `src/lib/bibleVerses.ts` con un JSON importado desde una fuente como API.Bible o un archivo estático.

## Estructura

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, WhatsApp
│   ├── sections/   # Hero, About, Events, etc.
│   └── ui/         # GlassCard, Particles
├── hooks/
├── lib/
├── pages/Admin.tsx
└── App.tsx
```
