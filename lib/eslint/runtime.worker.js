import globals from 'globals';

import { isNotEmptyArray, mergeObjectsOrReduce } from './utils.js';

const runtimeWorker = (name, files, config = {}) => {
  if (!isNotEmptyArray(files)) return {};

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
