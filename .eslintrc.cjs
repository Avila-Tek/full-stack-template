module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-avila-tek`
  extends: ['avila-tek'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
