/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontSize: {
      xs: '0.625rem',
      sm: '0.6875rem',
      base: '0.75rem',
      lg: '1rem',
      xl: '1.25rem'
    },
    extend: {
      colors: {
        black: '#0A0908',
        snow: '#FCF7F8',
        grey: '#7C898B'
      }
    }
  },
  plugins: []
};
