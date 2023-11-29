/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        bungee: ['Bungee', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

