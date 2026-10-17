import cssicorn from 'eslint-cssicorn';

const name = 'cssicorn';

// https://github.com/sindresorhus/eslint-cssicorn#rules
const rules = {
  all: cssicorn.configs.all.rules,
  recommended: cssicorn.configs.recommended.rules,
  unopinionated: cssicorn.configs.unopinionated.rules,
};

export const pluginCssicorn = {
  name,
  plugin: cssicorn,
  rules,
};
