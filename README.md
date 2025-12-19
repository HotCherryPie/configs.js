# `configs.js`

Configs for JS ecosystem.

#### References

- [`sxzz/eslint-config`](https://github.com/sxzz/eslint-config)

## About

- **ESLint**
  - ~~`.languageOptions.ecmaVersion` always `latest`. Use separate plugins for language feature limitations.~~
  - `.languageOptions.sourceType` always `module`.
  - `<script setup lang="ts">` is mandatory for `.vue` files.

## Info

### TypeScript

- [TSConfig Grimoire](https://github.com/bluwy/tsconfig-grimoire)

### ESLint

- [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [`.languageOptions`](https://eslint.org/docs/latest/use/configure/language-options)
- [`.files`](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) config property uses minimatch syntax

* [**`typescript-eslint`**](https://www.npmjs.com/package/typescript-eslint)
  - [`@typescript-eslint/parser` / Project Service](https://typescript-eslint.io/packages/parser/#projectservice)
  - [List of overrode base `@eslint/js` rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts)
* [**`typescript-eslint-parser-for-extra-files`** compatibility with flat config](https://github.com/ota-meshi/typescript-eslint-parser-for-extra-files/issues/95)
* [**`vue-eslint-parser`** problems with `typescript-eslint`](https://github.com/vuejs/vue-eslint-parser/issues/104)
