/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Sohne Schmal', 'Impact', 'Helvetica', 'Arial', 'sans-serif'],
        'heading': ['Sohne Schmal', 'Impact', 'Helvetica', 'Arial', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'serif': ['Sohne Schmal', 'Impact', 'Helvetica', 'Arial', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'premium-black': '#000000',
        'premium-white': '#FFFFFF',
        'premium-gray': '#1a1a1a',
      },
    },
  },
  plugins: [],
}

