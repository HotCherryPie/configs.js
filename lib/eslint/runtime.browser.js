import globals from 'globals';

import { mergeObjectsOrReduce } from './utils.js';

const runtimeBrowser = (name, files, config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name,
    files,
    languageOptions: {
      globals: globals.browser,
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { runtimeBrowser };
