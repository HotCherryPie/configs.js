## Requirements

- **Node 22.12+**
- **TS 5.7+**
- **ESLint 9.19+**
- **Prettier 3.4+**

You should specify TS/ESLint/Prettier in `devDependencies`!

```json
{
  "devDependencies": {
    "eslint": "~9.19.0",
    "prettier": "~3.4.0",
    "typescript": "~5.7.0"
  }
}
```

## About

- **ESLint**
  - `.languageOptions.ecmaVersion` always `latest`. Use separate plugins for language feature limitations.
  - `.languageOptions.sourceType` always `module`.
  - `<script setup lang="ts">` in mandatory for `.vue` files.

## TODO

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

- Update `moduleResolution` fields after `ts@5.8` release.
  - Consider update of `module` along side with `moduleResolution`.
  - Current reason for `moduleResolution:NodeNext` is [this](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/#validated-json-imports-in---module-nodenext).

### ESLint

- Inspect [`@vue/eslint-config-typescript`](https://www.npmjs.com/package/@vue/eslint-config-typescript)
- **`eslint-plugin-import-x`**
  - Provide configs
  - Consider `import/no-cycle`
  - Consider `import-x/no-default-export`
    - Conflicts with many tooling configs
- ? Specify `sourceType` & `ecmaVersion` only once in core config at the top.
- Enable & configure [`unicorn/expiring-todo-comments`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md)

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
