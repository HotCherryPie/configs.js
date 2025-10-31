# `configs.js`

Configs for JS ecosystem

## About

- **ESLint**
  - `.languageOptions.ecmaVersion` always `latest`. Use separate plugins for language feature limitations.
  - `.languageOptions.sourceType` always `module`.
  - `<script setup lang="ts">` is mandatory for `.vue` files.

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
