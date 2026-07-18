# `configs.js`

Configs for JS ecosystem.

#### References

- [`sxzz/eslint-config`](https://github.com/sxzz/eslint-config)
- [`antfu/eslint-config`](https://github.com/antfu/eslint-config)

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
