module.exports = {
  extends: ['avilatek-typescript', 'plugin:@next/next/recommended'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-use-before-define': 'off',
    'prefer-arrow-callback': 'off',
    'import/no-cycle': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    '@next/next/no-img-element': 'off',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'error',
  },
};
