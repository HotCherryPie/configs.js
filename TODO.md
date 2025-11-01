## TODO

- [Use OXC version of prettier](https://prettier.io/blog/2025/06/23/3.6.0#javascript)
- Remove `@types/node` from `peerDependencies`?
- ? Make plugin dependencies optional.
  - For publishing specify all plugin dependencies as `peerDependencies`
  - `plugin.vue.js` uses ts parser.
- Consider [`preserve-caught-error`](https://eslint.org/docs/latest/rules/preserve-caught-error)
- Consider [ESlint Multithread Linting](https://eslint.org/blog/2025/08/multithread-linting/)

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

### ESLint

- [`@cspell/eslint-plugin`](https://www.npmjs.com/package/@cspell/eslint-plugin)
- [`eslint-plugin-de-morgan`](https://www.npmjs.com/package/eslint-plugin-de-morgan)
- [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise)
- [`eslint-plugin-risxss`](https://www.npmjs.com/package/eslint-plugin-risxss)
- [`eslint-plugin-security`](https://www.npmjs.com/package/eslint-plugin-security)

* **`eslint-plugin-sonarjs`**
  - Consider dropping of `sonar/redundant-type-aliases`
* **`eslint-plugin-vue`**
  - Change default severity of `recommended` & `strongly-recommended` rulesets to `error`. It's just warnings right now
* **`eslint-plugin-import-x`**
  - Add `import/no-extraneous-dependencies`
  - Consider specifying of [new resolver](https://github.com/un-ts/eslint-plugin-import-x/releases/tag/v4.6.0)
  - Consider [`@helljs/eslint-import-resolver-x`](https://www.npmjs.com/package/@helljs/eslint-import-resolver-x)
  - Consider [`import/no-cycle`](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md)
* Inspect [`@vue/eslint-config-typescript`](https://www.npmjs.com/package/@vue/eslint-config-typescript)
* ? Specify `sourceType` & `ecmaVersion` only once in core config at the top.
* Enable & configure [`unicorn/expiring-todo-comments`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md)
* Research a way to force component props to always be wrapped in `ReadonlyDeep`
