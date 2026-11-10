# ESLint

## Config

- [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)

### `files`

- [Specify `files` and `ignores`](https://eslint.org/docs/latest/use/configure/configuration-files#specify-files-and-ignores)
  > Patterns specified in files and ignores use [minimatch](https://www.npmjs.com/package/minimatch) syntax and are evaluated relative to the location of the eslint.config.js file.

#### Virtual files

Some plugin may produce _virtual files_ during linting. For example `@eslint/markdown` will produce one virtual file for each block of embedded code.

Virtual files creates _under_ the original file. For example: `js` blocks inside `markdown` can be matched like this `[**/*.md/*.js]`. Read more in [_"Specify a Processor"_](https://eslint.org/docs/latest/use/configure/plugins#specify-a-processor) documentation section.

### `processor`

Plugins may provide processors. Processors can extract JavaScript code from other kinds of files, then let ESLint lint the JavaScript code. Alternatively, processors can convert JavaScript code during preprocessing.

- [Specify a Processor](https://eslint.org/docs/latest/use/configure/plugins#specify-a-processor)

#### Examples

- [`@eslint/markdown`](https://github.com/eslint/markdown/blob/f103b49f5f148252c7cfce903abe27127d846ac9/src/index.js#L59)
- [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue/blob/68da3d8957341418d8f39ebc32d9e06791f5e869/lib/plugin.ts#L520)

### `language`

Plugins may provide languages. Languages allow ESLint to lint programming languages besides JavaScript.

- [Specify a Language](https://eslint.org/docs/latest/use/configure/plugins#specify-a-language)

#### Examples

- [`@eslint/json`](https://github.com/eslint/json/blob/2c5a2d64c03da474f6ec4fe6aca678559c07d91d/src/index.js#L25)
- [`@eslint/css`](https://github.com/eslint/css/blob/ceebaa5bce8cc41e0266a3642dd343b27b38383c/src/index.js#L24)
- [`@eslint/markdown`](https://github.com/eslint/markdown/blob/f103b49f5f148252c7cfce903abe27127d846ac9/src/index.js#L61)
- [`@html-eslint/eslint-plugin`](https://github.com/yeonjuan/html-eslint/blob/d0babaf320a0d5c3b72f6d8c7bf49b2841a0b84f/packages/eslint-plugin/lib/index.js#L17)

## Plugins

- [**`typescript-eslint`**](https://www.npmjs.com/package/typescript-eslint)
  - [`@typescript-eslint/parser` / Project Service](https://typescript-eslint.io/packages/parser/#projectservice)
  - [List of overrode base `@eslint/js` rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts)
