// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  //css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      })
    }
  },
})