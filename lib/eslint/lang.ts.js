import { parser } from 'typescript-eslint';

import { mergeObjectsOrReduce } from './utils.js';

// eslint-disable-next-line unicorn/prevent-abbreviations
const ts = (tsconfigRootDir, config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name: 'lang:ts',
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { ts };
