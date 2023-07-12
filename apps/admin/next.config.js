// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@avila-tek/ui', '@avila-tek/models'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    serverComponentsExternalPackages: [],
  },
};
