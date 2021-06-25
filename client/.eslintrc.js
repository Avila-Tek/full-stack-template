module.exports = {
  extends: ['avilatek-typescript', 'plugin:@next/next/recommended'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
  },
};
