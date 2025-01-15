import type { Config } from "tailwindcss"

export default <Partial<Config>> {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
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