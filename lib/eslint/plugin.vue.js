import vue from 'eslint-plugin-vue';

/**
 * https://github.com/vuejs/eslint-plugin-vue/pull/2796
 */

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
  stronglyRecommendedWarn: configRules(vue.configs['flat/strongly-recommended']),
  stronglyRecommended: configRules(vue.configs['flat/strongly-recommended-error']),
  recommendedWarn: configRules(vue.configs['flat/recommended']),
  recommended: configRules(vue.configs['flat/recommended-error']),
};

export const pluginVue = {
  name,
  plugin: vue,
  rules,
};
