import { configCompatPrettier } from './config.compat.prettier.js';
import { js } from './lang.js.js';
import { ts } from './lang.ts.js';
import { vue } from './lang.vue.js';
import { pluginImport } from './plugin.import.js';
import { pluginJs } from './plugin.js.js';
import { pluginNode } from './plugin.node.js';
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
      [pluginNode.name]: pluginNode.plugin,
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

  runtimeBrowser('argyle/runtime:browser', runtimeScopes.browser),
  runtimeWorker('argyle/runtime:worker', runtimeScopes.worker),
  runtimeNode('argyle/runtime:node', runtimeScopes.node, {
    rules: {
      ...pluginNode.rules.recommended,
    },
  }),
  runtimeNode('argyle/runtime:tooling', runtimeScopes.tooling, {
    rules: {
      ...pluginNode.rules.recommended,

      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',

      'node/no-unpublished-import': 'off',
    },
  }),

  {
    name: 'argyle/compat:conflicts',
    rules: {
      // Handled by `sonar/deprecation`. `ts/no-deprecated` also works
      //  only with type-check enabled configs.
      'ts/no-deprecated': 'off',

      // In both cases we prefer `unicorn/expiring-todo-comments`
      'sonar/todo-tag': 'off',
      'sonar/fixme-tag': 'off',

      // Handled by `no-unused-vars`
      'sonar/unused-import': 'off',

      // Handled by `import/no-extraneous-dependencies`
      'node/no-extraneous-import': 'off',

      // Handled by `node/no-process-exit`
      'unicorn/no-process-exit': 'off',
    },
  },

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
        Env: true,
        props: true,
        Props: true,
        prop: true,
        Prop: true,
        utils: true,
        Utils: true,
        ref: true,
        Ref: true,
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
  'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],

  // Disabled because of poor type inference of `vue-tsc`
  'vue/require-default-prop': 'off',

  /* Enables of uncategorized rules */
  'vue/attribute-hyphenation': ['error', 'never'],
  'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/v-on-event-hyphenation': ['error', 'never'],

  // Disabled until regex is accepted.
  // 'vue/slot-name-casing': 'off',

  'vue/html-comment-content-newline': 'error',
  'vue/html-comment-content-spacing': 'error',
  'vue/html-comment-indent': 'error',

  'vue/block-lang': ['error', { script: { lang: 'ts' } }],
  'vue/component-api-style': ['error', ['script-setup']],
  'vue/define-emits-declaration': ['error', 'type-based'],
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/enforce-style-attribute': ['error', { allow: ['module'] }],
  'vue/html-button-has-type': 'error',
  'vue/no-duplicate-attr-inheritance': 'error',
  'vue/no-empty-component-block': 'error',
  'vue/no-import-compiler-macros': 'error',
  'vue/no-ref-object-reactivity-loss': 'error',
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
  'vue/padding-line-between-blocks': ['error', 'always'],
  'vue/prefer-define-options': 'error',
  'vue/prefer-prop-type-boolean-first': 'error',
  'vue/prefer-use-template-ref': 'error',
  'vue/require-explicit-slots': 'error',
  'vue/require-macro-variable-name': 'error',
  'vue/require-typed-ref': 'error',
  'vue/v-on-handler-style': ['error', 'inline'],
};

opinionatedRules.pluginImport = {
  // Do not detect positives sometimes!
  //  Ex: /merlin/packages/cli/tsup.config.ts
  // 'import/no-extraneous-dependencies': ['error', { includeTypes: true }],

  // 'import/no-unresolved': 'error',

  // Next rules make sens only for js?
  // 'import/named: 'error'
  // 'import/namespace': 'error',
  // 'import/default': 'error',

  'import/export': 'error',
  'import/no-empty-named-blocks': 'error',

  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md
  'import/no-named-as-default': 'warn',
  'import/no-named-as-default-member': 'warn',
  'import/no-default-export': 'error',

  /* Stylistic rules */
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'warn',
  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
      distinctGroup: true,
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      warnOnUnassignedImports: true,
    },
  ],
};
