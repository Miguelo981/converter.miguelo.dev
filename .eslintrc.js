module.exports = {
  extends: [
    'plugin:nuxt/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'nuxt/no-csrf': 'off',
    'nuxt/no-timeline': 'off',
    'nuxt/no-async-data': 'off',
    'nuxt/no-store': 'off',
    'nuxt/no-env-in-config': 'off',
    'nuxt/no-process-env': 'off'
  }
}