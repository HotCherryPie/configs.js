import globals from 'globals';

import { isNotEmptyArray, mergeObjectsOrReduce } from './utils.ts';

const runtimeBrowser = (name, files, config = {}) => {
  if (!isNotEmptyArray(files)) return {};

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
