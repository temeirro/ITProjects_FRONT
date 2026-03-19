// src/test/setup.ts

// Цей файл запускається ПЕРЕД кожним тестом автоматично.
// Тут підключаємо розширення для матчерів jest-dom.
//
// Що це дає? Можливість писати зручні перевірки типу:
//   expect(element).toBeInTheDocument()
//   expect(button).toBeDisabled()
//   expect(input).toHaveValue('hello')
// замість складніших стандартних перевірок.

import '@testing-library/jest-dom';