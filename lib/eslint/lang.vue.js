import vuePlugin from 'eslint-plugin-vue';
import { parser as tsParser } from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

import { mergeObjectsOrReduce } from './utils.js';

// eslint-disable-next-line unicorn/prevent-abbreviations
const vue = (tsconfigRootDir, config = {}) => {
  /** @type {import('eslint').Linter.Config} */
  const defaultConfig = {
    name: 'lang:vue',
    files: ['**/*.vue'],
    processor: vuePlugin.processors.vue,
    languageOptions: {
      parser: vueParser,
      sourceType: 'module',
      parserOptions: {
        parser: tsParser,
        projectService: true,
        tsconfigRootDir,
        extraFileExtensions: ['.vue'],
      },
    },
  };

  return mergeObjectsOrReduce(defaultConfig, config);
};

export { vue };
