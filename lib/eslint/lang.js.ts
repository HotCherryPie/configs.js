import type { Linter } from 'eslint';

import { mergeObjectsOrReduce } from './utils.ts';

import type { Simplify } from 'type-fest';

const js = (config: Simplify<Linter.Config> = {}) => {
  const defaultConfig: Simplify<Linter.Config> = {
    name: 'lang:js',
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { js };
