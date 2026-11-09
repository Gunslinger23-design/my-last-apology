/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moody-dark':    '#1A0E06',
        'moody-brown':   '#4A2C11',
        'moody-mid':     '#2E1A0A',
        'moody-amber':   '#C68B2F',
        'moody-ocre':    '#D4A843',
        'moody-olive':   '#5C6B2F',
        'moody-olive-l': '#7A8C40',
        'moody-burgundy':'#6B1A2A',
        'moody-cream':   '#E8DCC8',
        'moody-gold':    '#B8860B',
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'bounce-slow':'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
