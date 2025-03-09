import node from 'eslint-plugin-n';

import { renamePluginScope } from './utils.js';

const name = 'node';

const configRules = (config) =>
  renamePluginScope(node.configs[config].rules, 'n', name);

const rules = {
  recommended: configRules('flat/recommended-module'),
};

export const pluginNode = {
  name,
  plugin: node,
  rules,
};
