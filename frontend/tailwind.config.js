/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#0D0F10',
          secondary: '#141718',
          card: '#191D1E',
          elevated: '#202526',
        },
        border: {
          subtle: '#2B3031',
          hover: '#3D4446',
        },
        text: {
          primary: '#F2F2EF',
          secondary: '#929A98',
          muted: '#697270',
        },
        brand: {
          orange: '#D97735',
          soft: '#B96932',
          highlight: '#E69A5C',
        },
        risk: {
          low: '#43A879',
          moderate: '#D5B34A',
          high: '#DB873A',
          veryHigh: '#D95343',
          extreme: '#8F2528',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'panel': '12px',
        'subtle': '10px',
        'card': '14px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'elevated': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

