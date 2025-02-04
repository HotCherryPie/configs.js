import { configBase } from './lib/prettier.config.base.js';

/** @type {import('prettier').Config} */
export default {
  ...configBase,

  overrides: [
    {
      files: ['**/eslint.config.*'],
      options: {
        printWidth: 100,
      },
    },
  ],
};
