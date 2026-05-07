import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 1. Налаштування проксі для обходу блокувальників (Крок 4)
  server: {
    proxy: {
      // Перенаправляємо запити з /ingest на сервери PostHog
      '/ingest': {
        target: 'https://eu.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ingest/, '')
      }
    }
  },

  // 2. Налаштування Vitest
  test: {
    // Використовуємо jsdom для емуляції браузера в тестах
    environment: 'jsdom',

    // Підключаємо файл налаштувань перед кожним тестом
    setupFiles: ['./src/test/setup.ts'],

    // Дозволяє писати describe/it/expect без імпортів
    globals: true,

    // Налаштування звіту покриття коду
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/test/**',
      ],
      reporter: ['text', 'html'],
    },
  },
})