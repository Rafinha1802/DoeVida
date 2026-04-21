/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#B21E24',
        'brand-red-light': '#FCE7E8',
      }
    },
  },
  plugins: [],
}
