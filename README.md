## Requirements

- **Node 22+**
- **TS 5.7**
- **ESLint 9.22+**
- **Prettier 3.5+**

> **Note**
>
> If installed vie file protocol, you should install dependencies with `--install-links` flag.
> Example: `npm i --install-links`

## About

- **ESLint**
  - `.languageOptions.ecmaVersion` always `latest`. Use separate plugins for language feature limitations.
  - `.languageOptions.sourceType` always `module`.
  - `<script setup lang="ts">` is mandatory for `.vue` files.

## TODO

- [Use OXC version of prettier](https://prettier.io/blog/2025/06/23/3.6.0#javascript)
- Remove `@types/node` from `peerDependencies`?
- ? Make plugin dependencies optional.
  - For publishing specify all plugin dependencies as `peerDependencies`
  - `plugin.vue.js` uses ts parser.

Consider explicit js exports in `package.json`

```jsonc
{
  "./**/*.js": {
    "import": "./lib/**/*.js",

    // Can be a problem when eslint plugins became optional
    //  because of async imports. Or just use `require()`?
    "module-sync": "./lib/**/*.js",
  },
}
```

### TSConfig

- Update `moduleResolution` & `module` fields after `ts@5.8` release.
  - Consider update of `module` along side with `moduleResolution`.
  - Current reason for `moduleResolution:NodeNext` is [this](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/#validated-json-imports-in---module-nodenext).

### ESLint

- [`@cspell/eslint-plugin`](https://www.npmjs.com/package/@cspell/eslint-plugin)
- [`eslint-plugin-de-morgan`](https://www.npmjs.com/package/eslint-plugin-de-morgan)
- [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise)
- [`eslint-plugin-risxss`](https://www.npmjs.com/package/eslint-plugin-risxss)
- [`eslint-plugin-security`](https://www.npmjs.com/package/eslint-plugin-security)

* Replace `ts/no-namespace` with [`eslint-plugin-erasable-syntax-only`](https://www.npmjs.com/package/eslint-plugin-erasable-syntax-only)
* Inspect [`@vue/eslint-config-typescript`](https://www.npmjs.com/package/@vue/eslint-config-typescript)
* **`eslint-plugin-import-x`**
  - Add `import/no-extraneous-dependencies`
  - Consider specifying of [new resolver](https://github.com/un-ts/eslint-plugin-import-x/releases/tag/v4.6.0)
  - Consider [`@helljs/eslint-import-resolver-x`](https://www.npmjs.com/package/@helljs/eslint-import-resolver-x)
  - Consider [`import/no-cycle`](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md)
* ? Specify `sourceType` & `ecmaVersion` only once in core config at the top.
* Enable & configure [`unicorn/expiring-todo-comments`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md)
* Research a way to force component props to always be wrapped in `ReadonlyDeep`

## Info

### ESLint

- [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [`languageOptions`](https://eslint.org/docs/latest/use/configure/language-options)

* [`typescript-eslint-parser-for-extra-files` / compatibility with flat config](https://github.com/ota-meshi/typescript-eslint-parser-for-extra-files/issues/95)
* [`@typescript-eslint/parser` / Project Service](https://typescript-eslint.io/packages/parser/#projectservice)
* [`vue-eslint-parser` / problems with `typescript-eslint`](https://github.com/vuejs/vue-eslint-parser/issues/104)

### TypeScript

- [Original configs from `create-vite`](https://github.com/vitejs/vite/blob/main/packages/create-vite/template-vue-ts)
- [`vue` recommended config](https://www.npmjs.com/package/@vue/tsconfig)
- [`create-vue` set of configs](https://github.com/vuejs/create-vue/tree/main/template/tsconfig/base)
