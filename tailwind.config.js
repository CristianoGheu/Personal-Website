/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/**/*.{html,ts}",
    "./src/app/components/**/*.{html,ts}",
    "./src/app/pages/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'text-color': 'var(--text-color)'
      }
    },
  },
  plugins: [],
}
