# TODO

- [Use OXC version of prettier](https://prettier.io/blog/2025/06/23/3.6.0#javascript)
- Make plugin dependencies optional.
  - `plugin.vue.js` uses ts parser.
- Consider [ESlint Multithread Linting](https://eslint.org/blog/2025/08/multithread-linting/)

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

### TypeScript

- Migrate to `v7`
  - ⏱️ [`vuejs/language-tools`](https://github.com/vuejs/language-tools/issues/5381)

### ESLint

- [`@cspell/eslint-plugin`](https://www.npmjs.com/package/@cspell/eslint-plugin)
- [`eslint-plugin-de-morgan`](https://www.npmjs.com/package/eslint-plugin-de-morgan)
- [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise)
- [`eslint-plugin-risxss`](https://www.npmjs.com/package/eslint-plugin-risxss)
- [`eslint-plugin-security`](https://www.npmjs.com/package/eslint-plugin-security)

* **`eslint-plugin-sonarjs`**
  - Consider dropping of `sonar/redundant-type-aliases`
* **`eslint-plugin-import-x`**
  - Consider [`import/no-extraneous-dependencies`](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md)
  - Consider [`import/no-cycle`](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md)
  - Consider specifying of [new resolver](https://github.com/un-ts/eslint-plugin-import-x/releases/tag/v4.6.0)
  - Consider [`@helljs/eslint-import-resolver-x`](https://www.npmjs.com/package/@helljs/eslint-import-resolver-x)

- Inspect [`@vue/eslint-config-typescript`](https://www.npmjs.com/package/@vue/eslint-config-typescript)
- ? Specify `sourceType` & `ecmaVersion` only once in core config at the top.
- Research a way to force component props to always be wrapped in `ReadonlyDeep`

### TS+Vue Linting

- Make new `lang.ts+vue.ts` config
- TS config should use vue-parser to support vue components in ts files

* [Official solution](https://github.com/vuejs/eslint-config-typescript/blob/b617ee646f84f75c9647291e0d89133987b7a9a2/src/internals.ts#L172)
  - [`vue-eslint-parser` and `typescript-eslint` problems](https://github.com/vuejs/vue-eslint-parser/issues/104)
* [`typescript-eslint-parser-for-extra-files`](https://github.com/ota-meshi/typescript-eslint-parser-for-extra-files)
  - [`typescript-parser` is not changed in flat config](https://github.com/ota-meshi/typescript-eslint-parser-for-extra-files/issues/95)
