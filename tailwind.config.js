/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deep: {
          blue: '#0a1628',
          navy: '#122a4a',
        },
        gold: {
          soft: '#d4af37',
          light: '#f0d78c',
        },
        warm: {
          glow: '#fff8e7',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(18,42,74,0.75) 50%, rgba(212,175,55,0.15) 100%)',
        'glass':
          'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
        gold: '0 0 40px rgba(212,175,55,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
