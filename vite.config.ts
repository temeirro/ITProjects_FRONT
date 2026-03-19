import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Налаштування Vitest
  test: {
    // Використовуємо jsdom — він емулює браузер під час тестів
    // щоб React-компоненти могли рендеритись без реального браузера
    environment: 'jsdom',

    // Підключаємо файл налаштувань перед кожним тестом
    setupFiles: ['./src/test/setup.ts'],

    // Дозволяє писати describe/it/expect без імпортів (як у Jest)
    globals: true,

    // Налаштування звіту покриття коду
    coverage: {
      // v8 — це вбудований інструмент покриття від Node.js
      provider: 'v8',

      // Які папки аналізувати
      include: ['src/**/*.{ts,tsx}'],

      // Що виключити з аналізу
      exclude: [
        'src/main.tsx',       // точка входу — не тестується
        'src/**/*.d.ts',      // файли типів TypeScript
        'src/test/**',        // сама папка з тестами
      ],

      // Формати звіту: текст у консолі + HTML-звіт у папці coverage/
      reporter: ['text', 'html'],
    },
  },
})