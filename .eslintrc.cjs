module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn', // Перетворюємо помилку на попередження
    '@typescript-eslint/no-explicit-any': 'warn', // Перетворюємо помилку на попередження
    '@typescript-eslint/ban-ts-comment': 'warn', // Перетворюємо помилку на попередження
    'react-hooks/exhaustive-deps': 'warn' // Залишаємо як попередження
  },
}
