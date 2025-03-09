import importX from 'eslint-plugin-import-x';

import { renamePluginScope } from './utils.js';

/**
 * Rules:
 *  https://github.com/un-ts/eslint-plugin-import-x/tree/master/docs/rules
 */

const name = 'import';

const configRules = (config) =>
  renamePluginScope(importX.flatConfigs[config].rules, 'import-x', name);

const rules = {
  recommended: configRules('recommended'),
  stage0: configRules('stage-0'),
  typescript: configRules('typescript'),
  warnings: configRules('warnings'),

  // electron: configRules('electron'), // only settings
  // react: configRules('react'), // only settings
  // reactNative: configRules('react-native'), // only settings
};

export const pluginImport = {
  name,
  plugin: importX,
  rules,
};
