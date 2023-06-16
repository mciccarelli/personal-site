/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Saol Display'],
      body: ['Cera Pro'],
      mono: ['inconsolata', 'monospace'],
    },
    extend: {
      colors: {
        blue: '#0000f3',
        black: '#161616',
        white: '#f8f8f8',
        green: '#05F140',
      },
    },
  },
  plugins: [],
}
