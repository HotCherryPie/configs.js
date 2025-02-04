import globals from 'globals';

import { mergeObjectsOrReduce } from './utils.js';

const runtimeWorker = (name, files, config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name,
    files,
    languageOptions: {
      globals: globals.worker,
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { runtimeWorker };
