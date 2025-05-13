/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8A2BE2",
        secondary: "#6A5ACD",
        graynew: "#f5f8ff",
        dark: {
          100: "#1E1E1E",
          200: "#2D2D2D",
          300: "#3D3D3D"
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}