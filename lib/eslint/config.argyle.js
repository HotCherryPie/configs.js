import { configCompatPrettier } from './config.compat.prettier.js';
import { js } from './lang.js.js';
import { ts } from './lang.ts.js';
import { vue } from './lang.vue.js';
import { pluginImport } from './plugin.import.js';
import { pluginJs } from './plugin.js.js';
import { pluginN } from './plugin.n.js';
import { pluginSonar } from './plugin.sonar.js';
import { pluginTs } from './plugin.ts.js';
import { pluginUnicorn } from './plugin.unicorn.js';
import { pluginVue } from './plugin.vue.js';
import { runtimeBrowser } from './runtime.browser.js';
import { runtimeNode } from './runtime.node.js';
import { runtimeWorker } from './runtime.worker.js';

const opinionatedRules = {};

/**
 * @param {{ node?: string[], browser?: string[], worker?: string[], tooling?: string[] } | undefined} runtimeScopes
 * @param {import('eslint').Linter.Config[]} extraConfig
 * @returns {import('eslint').Linter.Config[]}
 */
export const configArgyle = (runtimeScopes, extraConfig = []) => [
  {
    name: 'argyle/common',
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
  },

  {
    name: 'argyle/plugins',
    plugins: {
      [pluginJs.name]: pluginJs.plugin,
      [pluginTs.name]: pluginTs.plugin,
      [pluginVue.name]: pluginVue.plugin,
      [pluginSonar.name]: pluginSonar.plugin,
      [pluginUnicorn.name]: pluginUnicorn.plugin,
      [pluginImport.name]: pluginImport.plugin,
      [pluginN.name]: pluginN.plugin,
    },
  },

  js(),
  ts(import.meta.dirname),
  vue(import.meta.dirname),

  {
    name: 'argyle/lang:js',
    files: ['**/*.js'],
    rules: {
      ...pluginJs.rules.recommended,
      ...pluginSonar.rules.recommended,
      ...pluginUnicorn.rules.recommended,
      ...opinionatedRules.pluginSonar,
      ...opinionatedRules.pluginUnicorn,
      ...opinionatedRules.pluginImport,
    },
  },

  {
    name: 'argyle/lang:ts',
    files: ['**/*.ts'],
    rules: {
      ...pluginJs.rules.recommended,
      ...pluginTs.rules.eslintRecommended,
      ...pluginTs.rules.strictTypeChecked,
      ...pluginSonar.rules.recommended,
      ...pluginUnicorn.rules.recommended,
      ...opinionatedRules.pluginTs,
      ...opinionatedRules.pluginSonar,
      ...opinionatedRules.pluginUnicorn,
      ...opinionatedRules.pluginImport,
    },
  },

  {
    name: 'argyle/lang:vue',
    files: ['**/*.vue'],
    rules: {
      ...pluginJs.rules.recommended,
      ...pluginTs.rules.eslintRecommended,
      ...pluginTs.rules.strict, // Type-checked rules don't work with vue for now.
      ...pluginVue.rules.recommended,
      ...pluginSonar.rules.recommended,
      ...pluginUnicorn.rules.recommended,
      ...opinionatedRules.pluginTs,
      ...opinionatedRules.pluginVue,
      ...opinionatedRules.pluginSonar,
      ...opinionatedRules.pluginUnicorn,
      ...opinionatedRules.pluginImport,
    },
  },

  {
    name: 'argyle/compat:conflicts',
    rules: {
      // `sonar/deprecation` is better. `ts/no-deprecated` also works
      //  only with type-check enabled configs.
      'ts/no-deprecated': 'off',

      // In both cases we prefer `unicorn/expiring-todo-comments`
      'sonar/todo-tag': 'off',
      'sonar/fixme-tag': 'off',

      // Handled by `no-unused-vars`
      'sonar/unused-import': 'off',

      // TODO: consider
      // Handled by `import/no-extraneous-dependencies`
      // 'n/no-extraneous-import': 'off'
    },
  },

  runtimeBrowser('argyle/runtime:browser', runtimeScopes.browser),
  runtimeWorker('argyle/runtime:worker', runtimeScopes.worker),
  runtimeNode('argyle/runtime:node', runtimeScopes.node, {
    rules: {
      ...pluginN.rules.recommended,
    },
  }),
  runtimeNode('argyle/runtime:tooling', runtimeScopes.tooling, {
    rules: {
      ...pluginN.rules.recommended,

      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'off',
      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  }),

  ...extraConfig,

  {
    name: 'argyle/universal-ignores',
    ignores: ['**/dist/**'],
  },

  // Ideally this should always be at the end of config.
  ...configCompatPrettier(),
];

opinionatedRules.pluginSonar = {
  /* Updates of rules form predefined configs */
  'sonar/void-use': 'off', // Complements `ts/no-confusing-void-expression`
};

opinionatedRules.pluginUnicorn = {
  /* Updates of rules form predefined configs */
  'unicorn/prevent-abbreviations': [
    'error',
    {
      allowList: {
        env: true,
        props: true,
        Props: true,
        prop: true,
        Prop: true,
        utils: true,
      },
    },
  ],
};

opinionatedRules.pluginTs = {
  /* Updates of rules form predefined configs */
  'ts/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
  'ts/no-meaningless-void-operator': 'off', // Complements `ts/no-confusing-void-expression`

  /* Enables of uncategorized rules */
  'ts/consistent-type-exports': 'error',
  'ts/consistent-type-imports': 'error',
  'ts/method-signature-style': ['error', 'property'],
  'ts/no-import-type-side-effects': 'error',
  'ts/no-unsafe-type-assertion': 'error',
  'ts/no-useless-empty-export': 'error',
  'ts/naming-convention': [
    'error',
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      trailingUnderscore: 'allow',
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
      trailingUnderscore: 'allow',
    },
    {
      selector: 'parameter',
      format: ['camelCase', 'PascalCase'],
    },
    {
      selector: 'parameter',
      modifiers: ['unused'],
      format: ['camelCase', 'PascalCase'],
      filter: { match: true, regex: '^_.*' },
      leadingUnderscore: 'require',
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
      custom: {
        regex: '^[IT][A-Z]',
        match: false,
      },
    },
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      custom: {
        regex: '^[T]([A-Z]|$)',
        match: true,
      },
    },
  ],
};

opinionatedRules.pluginVue = {
  /* Updates of rules form predefined configs */
  'vue/multi-word-component-names': 'off',
  'vue/no-reserved-component-names': 'off',
  'vue/component-definition-name-casing': ['error', 'PascalCase'],

  /* Enables of uncategorized rules */
  'vue/attribute-hyphenation': ['error', 'never'],
  'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/slot-name-casing': ['error', 'camelCase'],
  'vue/v-on-event-hyphenation': ['error', 'never'],

  'vue/html-comment-content-newline': 'error',
  'vue/html-comment-content-spacing': 'error',
  'vue/html-comment-indent': 'error',

  'vue/block-lang': ['error', { script: { lang: 'ts' } }],
  'vue/component-api-style': ['error', ['script-setup']],
  'vue/define-emits-declaration': ['error', 'type-based'],
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/enforce-style-attribute': ['error', { allow: ['module'] }],
  'vue/padding-line-between-blocks': ['error', 'always'],
  'vue/prefer-define-options': 'error',
  'vue/prefer-prop-type-boolean-first': 'error',
  'vue/require-explicit-slots': 'error',
  'vue/block-order': [
    'error',
    {
      order: ['script', 'template', 'style'],
    },
  ],
  'vue/require-macro-variable-name': [
    'error',
    {
      defineProps: 'props',
      defineEmits: 'emit',
      defineSlots: 'slots',
      useSlots: 'slots',
      useAttrs: 'attrs',
    },
  ],

  'vue/html-button-has-type': 'error',
  'vue/no-duplicate-attr-inheritance': 'error',
  'vue/no-empty-component-block': 'error',
  'vue/no-ref-object-reactivity-loss': 'error',
  'vue/no-required-prop-with-default': 'error',
  'vue/no-setup-props-reactivity-loss': 'error',
  'vue/no-undef-components': 'error',
  'vue/no-undef-properties': 'error',
  'vue/no-unused-emit-declarations': 'error',
  'vue/no-unused-properties': 'error',
  'vue/no-unused-refs': 'error',
  'vue/no-use-v-else-with-v-for': 'error',
  'vue/no-useless-mustaches': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/no-v-text': 'error',
  'vue/prefer-use-template-ref': 'error',
  'vue/require-default-prop': 'error',
  'vue/require-typed-ref': 'error',
  'vue/valid-define-options': 'error',
};

opinionatedRules.pluginImport = {
  'import/order': [
    'error',
    {
      distinctGroup: true,
      'newlines-between': 'always',
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],

  // Next rules make sens only for js
  // 'import/no-unresolved': 'error',
  // 'import/named: 'error'
  // 'import/namespace': 'error',
  // 'import/default': 'error',

  'import/export': 'error',

  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md
  'import/no-named-as-default': 'warn',
  'import/no-named-as-default-member': 'warn',
  'import/no-duplicates': 'warn',
  'import/no-default-export': 'error',
};
