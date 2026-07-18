import js from '@eslint/js';

const name = 'js';

const rules = {
  recommended: js.configs.recommended.rules,
};

export const pluginJs = {
  name,
  plugin: {},
  rules,
};
