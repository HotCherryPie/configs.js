import { mergeObjectsOrReduce } from './utils.js';

const css = (config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name: 'lang:css',
    files: ['**/*.css'],
    language: 'css/css',
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { css };
