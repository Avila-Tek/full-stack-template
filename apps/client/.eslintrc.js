/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@avila-tek/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['jest'],
  env: {
    jest: true,
  },
};
