/**
 * СЕКЦІЯ 1: Модульні тести для localStorageUtils.ts
 */
import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import {
    addLocalStorage,
    deleteLocalStorage,
    getLocalStorage,
} from '../components/utils/storage/localStorageUtils';
import { isTokenActive } from '../components/utils/storage/isTokenActive';
import { handleAxiosError } from '../components/utils/errors/handleAxiosError';
import { Status } from '../components/utils/enums/index';

describe('localStorageUtils — робота з LocalStorage', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    // Тест 1: Запис і читання рядка
    it('addLocalStorage має коректно зберігати рядок', () => {
        addLocalStorage('test_key', 'hello');
        const result = getLocalStorage('test_key');
        expect(result).toBe('hello');
    });

    // Тест 2: Читання неіснуючого ключа
    it('getLocalStorage має повернути null якщо ключ не існує', () => {
        expect(getLocalStorage('nonexistent_key')).toBeNull();
    });

    // Тест 3: Видалення ключа
    it('deleteLocalStorage має повністю видаляти ключ', () => {
        addLocalStorage('temp_key', 'some_data');
        deleteLocalStorage('temp_key');
        expect(getLocalStorage('temp_key')).toBeNull();
    });

    // Тест 4: Перезапис існуючого ключа
    it('addLocalStorage має перезаписати значення якщо ключ вже існує', () => {
        addLocalStorage('user_key', 'old_value');
        addLocalStorage('user_key', 'new_value');
        expect(getLocalStorage('user_key')).toBe('new_value');
    });

    // Тест 5: Збереження кількох ключів незалежно
    it('різні ключі мають зберігатись незалежно', () => {
        addLocalStorage('key_a', 'valueA');
        addLocalStorage('key_b', 'valueB');
        expect(getLocalStorage('key_a')).toBe('valueA');
        expect(getLocalStorage('key_b')).toBe('valueB');
    });

});

/**
 * СЕКЦІЯ 2: Модульні тести для isTokenActive.ts
 */
describe('isTokenActive — валідація JWT токена', () => {

    // Тест 6: Валідний токен
    it('має повернути true для валідного токена', () => {
        const futureExp = Math.floor((Date.now() + 60000) / 1000);
        const payload = btoa(JSON.stringify({ exp: futureExp }));
        const mockToken = `header.${payload}.signature`;
        expect(isTokenActive(mockToken)).toBe(true);
    });

    // Тест 7: Прострочений токен
    it('має повернути false для простроченого токена', () => {
        const pastExp = Math.floor((Date.now() - 60000) / 1000);
        const payload = btoa(JSON.stringify({ exp: pastExp }));
        const mockToken = `header.${payload}.signature`;
        expect(isTokenActive(mockToken)).toBe(false);
    });

    // Тест 8: Токен null
    it('має повернути false якщо токен null', () => {
        expect(isTokenActive(null)).toBe(false);
    });

    // Тест 9: Порожній рядок
    it('має повернути false якщо токен порожній рядок', () => {
        expect(isTokenActive('')).toBe(false);
    });

    // Тест 10: Токен без поля exp — вважається активним
    it('має повернути true якщо токен не має поля exp', () => {
        const payload = btoa(JSON.stringify({ userId: 42 }));
        const mockToken = `header.${payload}.signature`;
        expect(isTokenActive(mockToken)).toBe(true);
    });

    // Тест 11: Невалідний формат токена
    it('має повернути false якщо токен має невалідний формат', () => {
        expect(isTokenActive('invalid_token')).toBe(false);
    });

});

/**
 * СЕКЦІЯ 3: Модульні тести для handleAxiosError.ts
 */
describe('handleAxiosError — обробка помилок axios', () => {

    // Тест 12: Звичайна помилка повертає defaultMessage
    it('має повернути defaultMessage для звичайної помилки', () => {
        const error = new Error('звичайна помилка');
        expect(handleAxiosError(error, 'Щось пішло не так')).toBe('Щось пішло не так');
    });

    // Тест 13: Рядок замість помилки
    it('має повернути defaultMessage якщо передано рядок', () => {
        expect(handleAxiosError('просто рядок', 'Помилка')).toBe('Помилка');
    });

    // Тест 14: null замість помилки
    it('має повернути defaultMessage якщо передано null', () => {
        expect(handleAxiosError(null, 'Невідома помилка')).toBe('Невідома помилка');
    });

    // Тест 15: Axios помилка з response.data — покриває рядок error.response?.data ?? defaultMessage
    it('має повернути error.response.data якщо це axios помилка з відповіддю сервера', () => {
        const axiosError = new axios.AxiosError('Request failed');
        axiosError.response = {
            data: 'Сервер повернув помилку',
            status: 400,
            statusText: 'Bad Request',
            headers: {},
            config: {} as any,
        };
        expect(handleAxiosError(axiosError, 'defaultMessage')).toBe('Сервер повернув помилку');
    });

    // Тест 16: Axios помилка БЕЗ response.data — повертає defaultMessage
    it('має повернути defaultMessage якщо axios помилка не має response', () => {
        const axiosError = new axios.AxiosError('Network Error');
        // response не встановлено — undefined
        expect(handleAxiosError(axiosError, 'Мережева помилка')).toBe('Мережева помилка');
    });

});

/**
 * СЕКЦІЯ 4: Модульні тести для enums/index.ts (Status enum)
 */
describe('Status enum — перелік статусів', () => {

    // Тест 15: IDLE
    it('Status.IDLE має дорівнювати "idle"', () => {
        expect(Status.IDLE).toBe('idle');
    });

    // Тест 16: LOADING
    it('Status.LOADING має дорівнювати "loading"', () => {
        expect(Status.LOADING).toBe('loading');
    });

    // Тест 17: SUCCESS
    it('Status.SUCCESS має дорівнювати "completed"', () => {
        expect(Status.SUCCESS).toBe('completed');
    });

    // Тест 18: ERROR
    it('Status.ERROR має дорівнювати "error"', () => {
        expect(Status.ERROR).toBe('error');
    });

    // Тест 19: Всі значення унікальні
    it('всі значення Status мають бути унікальними', () => {
        const values = Object.values(Status);
        expect(new Set(values).size).toBe(values.length);
    });

});