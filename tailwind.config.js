// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#f4a261',
        'custom-gray': '#1a1a1a',
        'custom-blue': '#1e40af', // Matches the blue text in the banner
      },
    },
  },
  plugins: [],
};