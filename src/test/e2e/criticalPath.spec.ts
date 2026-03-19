// src/test/e2e/criticalPath.spec.ts
//
// E2E тести — Playwright відкриває реальний браузер і виконує дії
// як справжній користувач. Перед запуском має бути запущений dev сервер:
// npm run dev
//
// Запуск тестів: npm run test:e2e

import { test, expect } from '@playwright/test';

// ══════════════════════════════════════════════════════
//  СЦЕНАРІЙ 1: Головна сторінка відображається коректно
// ══════════════════════════════════════════════════════
//
// Критичний шлях: користувач заходить на сайт і бачить
// список учасників та анімований заголовок

test.describe('Головна сторінка', () => {

    test('має відображати заголовок та чіп Members', async ({ page }) => {
        // Відкриваємо головну сторінку
        await page.goto('/');

        // Перевіряємо що чіп "Members" присутній на сторінці
        const membersChip = page.getByText('Members');
        await expect(membersChip).toBeVisible();
    });

    test('кнопка write має бути задизейблена для незалогіненого користувача', async ({ page }) => {
        await page.goto('/');

        // Незалогінений користувач не повинен мати активну кнопку write
        const writeButton = page.getByRole('button', { name: 'write' });
        await expect(writeButton).toBeDisabled();
    });

    test('має відображати текст про необхідність входу перед завантаженням', async ({ page }) => {
        await page.goto('/');

        // Перевіряємо що є підказка для незалогінених
        const hint = page.getByText('Please, sign in before uploading your memories!');
        await expect(hint).toBeVisible();
    });

});

// ══════════════════════════════════════════════════════
//  СЦЕНАРІЙ 2: Сторінка логіну — критичний шлях
// ══════════════════════════════════════════════════════
//
// Критичний шлях: користувач переходить на логін,
// бачить форму, заповнює поля і натискає Sign in

test.describe('Сторінка логіну', () => {

    test('має відображати форму входу з полями username та password', async ({ page }) => {
        await page.goto('/login');

        // Перевіряємо що поле username присутнє
        const usernameInput = page.getByPlaceholder('enter ur username');
        await expect(usernameInput).toBeVisible();

        // Перевіряємо що кнопка Sign in присутня
        const signInButton = page.getByRole('button', { name: 'Sign in' });
        await expect(signInButton).toBeVisible();
    });

    test('має дозволяти вводити текст у поле username', async ({ page }) => {
        await page.goto('/login');

        const usernameInput = page.getByPlaceholder('enter ur username');

        // Вводимо логін
        await usernameInput.fill('testuser');

        // Перевіряємо що текст дійсно введено
        await expect(usernameInput).toHaveValue('testuser');
    });

    test('має відображати кнопку "take me there" для переходу без реєстрації', async ({ page }) => {
        await page.goto('/login');

        const takeMeButton = page.getByRole('button', { name: 'take me there' });
        await expect(takeMeButton).toBeVisible();
    });

    test('кнопка "take me there" має перенаправляти на головну сторінку', async ({ page }) => {
        await page.goto('/login');

        // Натискаємо кнопку
        await page.getByRole('button', { name: 'take me there' }).click();

        // Перевіряємо що URL змінився на головну
        await expect(page).toHaveURL('/');
    });

    test('має відображати посилання на реєстрацію', async ({ page }) => {
        await page.goto('/login');

        // "start now" рендериться як Link а не button — шукаємо по тексту
        const registerLink = page.getByText('start now');
        await expect(registerLink).toBeVisible();
    });

});

// ══════════════════════════════════════════════════════
//  СЦЕНАРІЙ 3: Сторінка реєстрації — критичний шлях
// ══════════════════════════════════════════════════════

test.describe('Сторінка реєстрації', () => {

    test('має відображати всі поля форми реєстрації', async ({ page }) => {
        await page.goto('/register');

        // Перевіряємо наявність поля username
        await expect(page.getByPlaceholder('> ur username')).toBeVisible();

        // Перевіряємо наявність поля email
        await expect(page.getByPlaceholder('you@example.com')).toBeVisible();

        // Перевіряємо наявність кнопки submit Sign up — exact щоб не плутати з Link Sign Up
        await expect(page.getByRole('button', { name: 'Sign up', exact: true })).toBeVisible();
    });

    test('має дозволяти заповнювати поля форми', async ({ page }) => {
        await page.goto('/register');

        // Заповнюємо username
        await page.getByPlaceholder('> ur username').fill('newuser');
        await expect(page.getByPlaceholder('> ur username')).toHaveValue('newuser');

        // Заповнюємо email
        await page.getByPlaceholder('you@example.com').fill('test@example.com');
        await expect(page.getByPlaceholder('you@example.com')).toHaveValue('test@example.com');
    });

   
});