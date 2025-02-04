import globals from 'globals';

import { mergeObjectsOrReduce } from './utils.js';

const runtimeNode = (name, files, config = {}) => {
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
