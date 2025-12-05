import { parser } from 'typescript-eslint';

import { mergeObjectsOrReduce } from './utils.ts';
import type { Simplify } from 'type-fest';
import type { Linter } from 'eslint';

// eslint-disable-next-line unicorn/prevent-abbreviations
const ts = (tsconfigRootDir: string, config = {}) => {
  const defaultConfig: Simplify<Linter.Config> = {
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
