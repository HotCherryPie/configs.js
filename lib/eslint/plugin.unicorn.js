import unicorn from 'eslint-plugin-unicorn';

const name = 'unicorn';

const rules = {
  all: unicorn.configs.all.rules,
  recommended: unicorn.configs.recommended.rules,
  unopinionated: unicorn.configs.unopinionated.rules,
};

export const pluginUnicorn = {
  name,
  plugin: unicorn,
  rules,
};
