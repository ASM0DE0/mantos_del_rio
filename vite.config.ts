import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hymns-proxy': {
        target: 'https://www.himnosycanticosdelevangelio.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hymns-proxy/, ''),
      },
    },
  },
  preview: {
    proxy: {
      '/hymns-proxy': {
        target: 'https://www.himnosycanticosdelevangelio.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hymns-proxy/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          calendar: ['@fullcalendar/core', '@fullcalendar/react', '@fullcalendar/daygrid', '@fullcalendar/timegrid'],
        },
      },
    },
  },
})
