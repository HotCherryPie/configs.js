import vue from 'eslint-plugin-vue';

const name = 'vue';

function configRules(config) {
  return (
    config
      .flatMap((it) => it.rules)
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((a, b) => ({ ...a, ...b }), {})
  );
}

/**
 * **Vue ESLint configs inheritance:**
 *
 * `base` <- `essential` <- `strongly-recommended` <- `recommended`
 */
const rules = {
  base: configRules(vue.configs['flat/base']),
  essential: configRules(vue.configs['flat/essential']),
  stronglyRecommended: configRules(vue.configs['flat/strongly-recommended']),
  recommended: configRules(vue.configs['flat/recommended']),
};

export const pluginVue = {
  name,
  plugin: vue,
  rules,
};
