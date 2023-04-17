import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: ['@lough/git-operate', '@lough/npm-operate'],
  globals: {},
  style: false,
  input: 'src/index.ts'
});
