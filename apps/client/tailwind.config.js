/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  content: [
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          100: '#8AF3EA',
          200: '#4FD6C9',
          300: '#3ABCB0',
          400: '#2EA89D',
          500: '#219287',
        },
        secondary: {
          100: '#FFEF8F',
          200: '#FFE85B',
          300: '#F9D604',
          400: '#E2C200',
          500: '#C6AA00',
        },
        neutral: {
          50: '#FBFBFB',
          100: '#A6A6A6',
          200: '#606060',
          300: '#404040',
          400: '#2D2D2D',
          500: '#202020',
          600: '#141414',
          700: '#070707',
        },
        success: {
          100: '#4FD6C9',
          200: '#3ABCB0',
          300: '#2EA89D',
        },
        warning: {
          100: '#FFE85B',
          200: '#F9D604',
          300: '#E2C200',
        },
        danger: {
          100: '#EF5362',
          200: '#DD2E3F',
          300: '#AC0818',
        },
        text: {
          white: '#FFFFFF',
          black: '#323333',
        },
        system: {
          white: '#FFFFFF',
          black: '#323333',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
