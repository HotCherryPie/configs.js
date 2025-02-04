import importX from 'eslint-plugin-import-x';

/**
 * Rules:
 *  https://github.com/un-ts/eslint-plugin-import-x/tree/master/docs/rules
 */

const name = 'import-x';

const rules = {};

export const pluginImportX = {
  name,
  plugin: importX,
  rules,
};
