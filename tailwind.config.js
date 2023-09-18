/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Inter'],
    },
    extend: {
      colors: {
        blue: '#0000f3',
        green: '#05F140',
      },
    },
  },
  plugins: [],
}
