/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e1e1e', // dark gray
          light: '#3a3a3a',
          dark: '#181818',
        },
        secondary: {
          DEFAULT: '#ff6b00', // orange
          light: '#ffb877',
          dark: '#cc5600',
        },
        accent: '#ffb877', // example accent color
      },
    },
  },
  plugins: [],
}

