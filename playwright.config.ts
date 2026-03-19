// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Папка де лежать E2E тести
  testDir: './src/test/e2e',

  // Скільки разів повторити тест при падінні (0 = не повторювати)
  retries: 0,

  // Запускаємо тести в одному потоці щоб не було конфліктів
  workers: 1,

  // Формат звіту: html = красивий звіт у браузері
  reporter: 'html',

  use: {
    // Адреса запущеного фронтенду (npm run dev)
    baseURL: 'http://localhost:5173',

    // Зберігати скріншот при падінні тесту
    screenshot: 'only-on-failure',

    // Зберігати відео при падінні тесту
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Автоматично запустити dev-сервер перед E2E тестами
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true, // якщо сервер вже запущений — не запускати знову
  },
});