module.exports = {
  extends: [
    'avilatek-typescript',
    'turbo',
    'next',
    'plugin:@next/next/recommended',
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'no-shadow': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
};
