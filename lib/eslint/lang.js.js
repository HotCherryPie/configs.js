import { mergeObjectsOrReduce } from './utils.js';

const js = (config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name: 'lang:js',
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { js };
