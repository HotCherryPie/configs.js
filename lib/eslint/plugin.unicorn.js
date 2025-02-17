import unicorn from 'eslint-plugin-unicorn';

const name = 'unicorn';

const rules = {
  recommended: unicorn.configs.recommended.rules,
};

export const pluginUnicorn = {
  name,
  plugin: unicorn,
  rules,
};
