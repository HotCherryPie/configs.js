import n from 'eslint-plugin-n';

const name = 'n';

const rules = {
  recommended: n.configs['flat/recommended-module'].rules,
};

export const pluginN = {
  name,
  plugin: n,
  rules,
};
