import { plugin, configs } from 'typescript-eslint';

import { renamePluginScope } from './utils.ts';

const name = 'ts';

function configRules(config) {
  // Actual ruleset alway comes last
  const c = [config].flat().at(-1);

  return renamePluginScope(c.rules, '@typescript-eslint', name);
}

/**
 * - `eslint-recommended`: disables of conflicting `eslint/js` rules;
 * - `disabled-type-checked`: opt-out type-checked rules;
 *
 * **TS ESLint configs inheritance:**
 *
 * - `recommended` <- `strict` <- `strict-type-checked`;
 * - `recommended-type-checked-only` <- `strict-type-checked-only`;
 */
const rules = {
  eslintRecommended: configRules(configs.eslintRecommended),

  recommended: configRules(configs.recommended),
  recommendedTypeChecked: configRules(configs.recommendedTypeChecked),
  recommendedTypeCheckedOnly: configRules(configs.recommendedTypeCheckedOnly),

  strict: configRules(configs.strict),
  strictTypeChecked: configRules(configs.strictTypeChecked),
  strictTypeCheckedOnly: configRules(configs.strictTypeCheckedOnly),

  disableTypeChecked: configRules(configs.disableTypeChecked),
};

export const pluginTs = {
  name,
  plugin,
  rules,
};
