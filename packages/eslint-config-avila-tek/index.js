/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'next',
    'turbo',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['html', 'prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@next/next/no-html-link-for-pages': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [
      'error',
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    'no-debugger': 'off',
    'no-alert': 'off',
    'global-require': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        bracketSpacing: true,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        useTabs: false,
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    env: {
      browser: true,
      node: true,
    },
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
