const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Saol Display'],
      body: ['Cera Pro'],
      // gotham: ['Gotham Condensed'],
      //display: ['Cera Pro'],
      //body: ['Cera Pro'],
      mono: ['inconsolata', 'monospace'],
    },
    extend: {
      colors: {
        blue: '#0000f3',
        black: '#161616',
        white: '#f8f8f8',
        green: '#05F140',
        // green: colors.emerald,
        // yellow: colors.amber,
        // purple: colors.violet,
      },
    },
  },
  plugins: [],
}
