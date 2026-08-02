/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: '#0A0F0D',
          900: '#0F1512',
          800: '#151D19',
          700: '#1D2822',
          600: '#2A3830',
        },
        grass: {
          400: '#5EE99C',
          500: '#3DDC84',
          600: '#2BB86E',
        },
        amber: {
          400: '#E8B347',
        },
        coral: {
          400: '#E8685D',
        },
        ink: {
          100: '#F2F5F3',
          300: '#B7C2BC',
          500: '#7C8A83',
          700: '#4A5750',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'pitch-lines': `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(61,220,132,0.045) 79px, rgba(61,220,132,0.045) 80px)`,
      },
    },
  },
  plugins: [],
};
