import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: [
    '@lough/git-changelog',
    '@lough/git-operate',
    '@lough/npm-operate',
    'chalk',
    'commander',
    'execa',
    'inquirer',
    'ora'
  ],
  globals: {},
  style: false,
  input: 'src/index.ts'
});
