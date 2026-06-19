/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EBF0FA',
          100: '#C3D1EF',
          200: '#9BB2E4',
          300: '#7393D9',
          400: '#4B74CE',
          500: '#3055B5',
          600: '#24418E',
          700: '#1B2E5E',
          800: '#132248',
          900: '#0D1733',
        },
        gold: {
          50: '#FFF8EC',
          100: '#FFE9C0',
          200: '#FFCF79',
          300: '#FFB633',
          400: '#F5A00E',
          500: '#E08800',
          600: '#C07300',
          700: '#9A5C00',
        },
        sky: {
          accent: '#5BB8F5',
          light: '#EBF5FF',
          border: '#C3E2FA',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
