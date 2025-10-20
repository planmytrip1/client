// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Company brand colors - এগুলো হেডার/ফুটার এ ব্যবহৃত হবে
        primary: {
          DEFAULT: '#0A2240', // Navy Blue (Logo Main)
          50: '#E6E9EE',
          100: '#CDD3DD',
          200: '#9AA7BA',
          300: '#667A98',
          400: '#334E75',
          500: '#0A2240', // Base
          600: '#081C36',
          700: '#06162B',
          800: '#041021',
          900: '#020A16',
        },
        secondary: {
          DEFAULT: '#F29C1F', // Orange-Gold (Logo Accent)
          50: '#FFF8EB',
          100: '#FFEEC8',
          200: '#FFD68C',
          300: '#FFBD50',
          400: '#FFA414',
          500: '#F29C1F',
          600: '#DA8A12',
          700: '#B9720E',
          800: '#995A0A',
          900: '#7A4507',
        },

        // Service-specific colors - আপনার ব্র্যান্ড থিমের সাথে সামঞ্জস্যপূর্ণ
        tour: {
          DEFAULT: '#2C5282', // বিশেষ নীল - আপনার primary কালারের একই পরিবারের
          50: '#EBF4FF',
          100: '#C3DAFE',
          200: '#A3BFFA',
          300: '#7F9CF5',
          400: '#667EEA',
          500: '#2C5282', // Base
          600: '#2B4F7E',
          700: '#243C65',
          800: '#1A2A47',
          900: '#151E2E',
        },
        hajj: {
          DEFAULT: '#2D6948', // গাঢ় সবুজ - আপনার primary কালারের সাথে মানানসই
          50: '#E3F9ED',
          100: '#C7F3DB',
          200: '#8FE7B7',
          300: '#57DA93',
          400: '#36C281',
          500: '#2D6948', // Base
          600: '#29633F',
          700: '#215035',
          800: '#183D2A',
          900: '#102A1D',
        },
        umrah: {
          DEFAULT: '#553C9A', // বেগুনি - আপনার secondary কালারের একটু গাঢ়
          50: '#F5F3FD',
          100: '#E9E6FB',
          200: '#D5CEF8',
          300: '#B7A7F0',
          400: '#9680E7',
          500: '#553C9A', // Base
          600: '#4C3687',
          700: '#402D72',
          800: '#35255D',
          900: '#291D47',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}