import { configCompatPrettier } from './config.compat.prettier.js';
import { css } from './lang.css.js';
import { js } from './lang.js.js';
import { ts } from './lang.ts.js';
import { vue } from './lang.vue.js';
import { pluginCss } from './plugin.css.js';
import { pluginCssicorn } from './plugin.cssicorn.js';
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

const name = (it) => `argyle/${it}`;

/**
 * @param {{ node?: string[], browser?: string[], worker?: string[], tooling?: string[] } | undefined} runtimeScopes
 * @param {import('eslint').Linter.Config[]} extraConfig
 * @returns {import('eslint').Linter.Config<unknown>[]}
 */
export const configArgyle = (runtimeScopes, extraConfig = []) => [
  {
    name: name('common'),
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
  },

  {
    name: name('plugins'),
    plugins: {
      [pluginJs.name]: pluginJs.plugin,
      [pluginTs.name]: pluginTs.plugin,
      [pluginVue.name]: pluginVue.plugin,
      [pluginCss.name]: pluginCss.plugin,
      [pluginSonar.name]: pluginSonar.plugin,
      [pluginUnicorn.name]: pluginUnicorn.plugin,
      [pluginImport.name]: pluginImport.plugin,
      [pluginNode.name]: pluginNode.plugin,
      [pluginCssicorn.name]: pluginCssicorn.plugin,
    },
  },

  js(),
  ts(import.meta.dirname),
  vue(import.meta.dirname),
  css(),

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
      ...pluginTs.rules.strict, // Type-checked rules don't work with Vue.js for now.
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
    name: 'argyle/lang:css',
    files: ['**/*.css'],
    language: 'css/css',
    rules: {
      ...pluginCss.rules.recommended,
      ...pluginCssicorn.rules.recommended,
      ...opinionatedRules.pluginCssicorn,
    },
  },

  runtimeBrowser(name('runtime:browser'), runtimeScopes.browser),
  runtimeWorker(name('runtime:worker'), runtimeScopes.worker),
  runtimeNode(name('runtime:node'), runtimeScopes.node, {
    rules: {
      ...pluginNode.rules.recommended,
      ...opinionatedRules.pluginNode,
    },
  }),
  runtimeNode(name('runtime:tooling'), runtimeScopes.tooling, {
    rules: {
      ...pluginNode.rules.recommended,
      ...opinionatedRules.pluginNode,

      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'node/no-unpublished-import': 'off',
      'unicorn/no-top-level-side-effects': 'off',
    },
  }),

  {
    name: name('compat:conflicts'),
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

      // Handled by `node/prefer-node-protocol`
      'unicorn/prefer-node-protocol': 'off',
    },
  },

  ...extraConfig,

  {
    name: name('universal-ignores'),
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
  /* Disables of predefined config rules */
  'unicorn/single-line-block-comment-style': 'off', // Don't like
  'unicorn/no-asterisk-prefix-in-documentation-comments': 'off', // Don't like

  /* Updates of rules form predefined configs */
  'unicorn/no-top-level-side-effects': [
    'error',
    { checkUnknownCalls: true, allow: {} },
  ],
  'unicorn/name-replacements': [
    'error',
    {
      allowList: Object.fromEntries(
        // prettier-ignore
        // eslint-disable-next-line unicorn/no-top-level-side-effects
        ['env','Env', 'props', 'Props', 'prop', 'Prop', 'utils', 'Utils', 'ref', 'Ref']
          .map((it) => [it, true]),
      ),
    },
  ],

  /* Enables of uncategorized rules */
  // 'unicorn/consistent-function-style': 'error',   // Bullshit
  // 'unicorn/id-match': 'error',                    // Almost same as `id-match`
  // 'unicorn/no-manually-wrapped-comments': 'error',// Bullshit
  // 'unicorn/no-unsafe-dom-html': 'warn',           // Low support
  // 'unicorn/prefer-dom-node-html-methods': 'warn', // Low support
  // 'unicorn/prefer-error-is-error': 'warn',        // Low support
  // 'unicorn/prefer-temporal': 'warn',              // Low support
  'unicorn/comment-content': 'error',
  'unicorn/consistent-destructuring': 'error',
  'unicorn/custom-error-definition': 'error',
  'unicorn/no-invalid-file-input-accept': 'error',
  'unicorn/prefer-import-meta-properties': 'error',
  'unicorn/prefer-iterator-concat': 'error',
  'unicorn/prefer-json-import': 'error',
  'unicorn/prefer-regexp-escape': 'error',
  'unicorn/prefer-short-arrow-method': 'error',
  'unicorn/prefer-uint8array-hex': 'error',
  'unicorn/require-post-message-target-origin': 'error',
  'unicorn/try-complexity': ['error', { max: 2 }],

  // Just for exploration for now.
  'unicorn/no-unused-properties': 'warn', // Probably many false positives
  'unicorn/prefer-dispose': 'warn',
};

opinionatedRules.pluginJs = {
  // See: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts

  /* Enables of uncategorized rules */
  'preserve-caught-error': ['error', { requireCatchParameter: true }],
};

opinionatedRules.pluginTs = {
  /* Updates of rules form predefined configs */
  'ts/no-base-to-string': ['error', { checkUnknown: true }],
  'ts/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
  'ts/no-meaningless-void-operator': 'off', // Complements `ts/no-confusing-void-expression`
  'ts/no-namespace': 'off', // Disabled in favor `erasableSyntaxOnly:true`

  /* Enables of uncategorized rules */
  'ts/consistent-type-exports': 'error',
  'ts/consistent-type-imports': 'error',
  'ts/method-signature-style': ['error', 'property'],
  'ts/no-import-type-side-effects': 'error',
  'ts/no-unsafe-type-assertion': 'error',
  'ts/no-useless-empty-export': 'error',
  'ts/strict-void-return': 'error',
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

      // Added only to allow `arguments_`
      trailingUnderscore: 'allow',
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
  'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
  'vue/component-definition-name-casing': ['error', 'PascalCase'],
  'vue/multi-word-component-names': 'off',
  'vue/no-reserved-component-names': 'off',
  'vue/require-default-prop': 'warn', // Disabled because of poor type inference of `vue-tsc`

  /* Enables of uncategorized rules */
  // 'vue/slot-name-casing': 'error',     // Disabled until regex is accepted.
  // 'vue/prefer-v-model': 'error'        // Disabled until `onlyNative` option.
  'vue/attribute-hyphenation': ['error', 'never'],
  'vue/block-lang': ['error', { script: { lang: 'ts' } }],
  'vue/component-api-style': ['error', ['script-setup']],
  'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/define-emits-declaration': ['error', 'type-based'],
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/define-props-destructuring': ['error', { destructure: 'never' }],
  'vue/enforce-style-attribute': ['error', { allow: ['module'] }],
  'vue/html-button-has-type': 'error',
  'vue/html-comment-content-newline': 'error',
  'vue/html-comment-content-spacing': 'error',
  'vue/html-comment-indent': 'error',
  'vue/no-content-outside-block': 'error',
  'vue/no-define-model-default': 'error',
  'vue/no-duplicate-attr-inheritance': 'error',
  'vue/no-empty-component-block': 'error',
  'vue/no-import-compiler-macros': 'error',
  'vue/no-literals-in-template': 'warn',
  'vue/no-props-shadow': 'error',
  'vue/no-ref-object-reactivity-loss': 'error',
  'vue/no-setup-props-reactivity-loss': 'error',
  'vue/no-shadow-native-events': 'error',
  'vue/no-undef-components': 'error',
  'vue/no-undef-directives': 'error',
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
  'vue/prefer-single-event-payload': 'error',
  'vue/prefer-use-template-ref': 'error',
  'vue/require-explicit-slots': 'error',
  'vue/require-macro-variable-name': 'error',
  'vue/require-typed-ref': 'error',
  'vue/v-on-event-hyphenation': ['error', 'never'],
  'vue/v-on-handler-style': ['error', 'inline'],
};

opinionatedRules.pluginImport = {
  // Do not detect positives sometimes!
  //  Ex: /merlin/packages/cli/tsup.config.ts
  // 'import/no-extraneous-dependencies': ['error', { includeTypes: true }],

  // Handled by ts. Only relevant in .js files.
  // 'import/no-unresolved': 'error',

  // Next rules make sens only for js?
  // 'import/named: 'error' 'import/namespace': 'error', 'import/default': 'error',

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

opinionatedRules.pluginNode = {
  /* Disables of predefined config rules */
  'node/no-unsupported-features/node-builtins': 'off', // Crashes too often

  /* Enables of uncategorized rules */
  'node/prefer-import/assert-strict': 'error',
  'node/prefer-node-protocol': 'error',
  'node/prefer-process-get-builtin-module': 'error',
};

opinionatedRules.pluginCssicorn = {
  /* Enables of uncategorized rules */
  // 'cssicorn/consistent-property-order': 'warn',   // TODO: consider
  'cssicorn/no-layout-animations': 'warn',
  'cssicorn/require-prefers-reduced-motion': 'warn',
};
