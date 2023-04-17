import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: ['execa'],
  globals: {},
  style: false,
  input: 'src/index.ts'
});
