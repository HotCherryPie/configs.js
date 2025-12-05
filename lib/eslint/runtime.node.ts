import globals from 'globals';

import { isNotEmptyArray, mergeObjectsOrReduce } from './utils.ts';

const runtimeNode = (name, files, config = {}) => {
  if (!isNotEmptyArray(files)) return {};

  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name,
    files,
    languageOptions: {
      /* `globals.nodeBuiltin`: Globals available to all code running in Node.js.
       *  These will usually be available as properties on the globalThis object
       *  and include process, Buffer, but not CommonJS arguments like require.
       *  See: https://nodejs.org/api/globals.html
       *
       * `globals.node`: A combination of the globals from nodeBuiltin plus all
       *  CommonJS arguments ("CommonJS module scope").
       *  See: https://nodejs.org/api/modules.html#modules_the_module_scope
       */
      globals: globals.nodeBuiltin,
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { runtimeNode };
