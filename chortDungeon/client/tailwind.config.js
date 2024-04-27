/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt: ['VT323', 'ui-sans-serif']
      },
      colors: {
        'bg': '#F5E9CD',
        'bg-light': '#E4D9BE',
        'bg-yelow': '#F6D890',
        'txt': '#4D2F00',
      }
    },
  },
  plugins: [],
}