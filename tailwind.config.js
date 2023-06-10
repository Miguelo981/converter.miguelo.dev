/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0f0e17',
        main: '#fffffe',
        primary: '#ff8906',
        secondary: '#f25f4c',
        tertiary: '#e53170',
        quaternary: '#a7a9be',
      },
    },
  },
  plugins: [],
}
