import css from '@eslint/css';

const name = 'css';

const rules = {
  recommended: css.configs.recommended.rules,
};

export const pluginCss = {
  name,
  plugin: css,
  rules,
};
