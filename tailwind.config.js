// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bright-ocean': {
          50: '#e8f2fc',
          100: '#d2e5f9',
          200: '#a5ccf3',
          300: '#78b2ed',
          400: '#4a99e8',
          500: '#1d7fe2',
          600: '#1766b5',
          700: '#124c87',
          800: '#0c335a',
          900: '#06192d',
          950: '#041220',
        },
        'yale-blue': {
          50: '#e7f3fd',
          100: '#d0e6fb',
          200: '#a0cdf8',
          300: '#71b5f4',
          400: '#419cf1',
          500: '#1283ed',
          600: '#0e69be',
          700: '#0b4f8e',
          800: '#07345f',
          900: '#041a2f',
          950: '#021221',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}