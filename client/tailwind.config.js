/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './context/**/*.{js,jsx,ts,tsx}',
    ],
    // defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
  darkMode: 'media', // 'media' or 'class'
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
          100: '#787878',
          200: '#5E5E5E',
          300: '#454545',
          400: '#2B2B2B',
          500: '#121212',
        },
        secondary: {
          100: '#DCFEEA',
          200: '#AAFDCD',
          300: '#79FCAF',
          400: '#47FA92',
          500: '#15F974',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
