module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)',
    },
  },
  plugins: [require('tailwindcss-filters')],
}
