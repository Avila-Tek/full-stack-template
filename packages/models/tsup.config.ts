import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  platform: 'node',
  splitting: false,
  clean: true,
  sourcemap: true,
  target: 'node18',
  shims: true,
  bundle: true,
  skipNodeModulesBundle: true,
});
