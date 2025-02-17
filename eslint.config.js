import { base } from './eslint.config.base.js';

const toolingFiles = [
  'lib/**',
  '**/eslint.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',
  'prettier.config.*',
];

export default base(
  {
    node: toolingFiles,
  },
  [
    {
      name: 'root/tooling',
      files: toolingFiles,
      rules: {
        'import/no-default-export': 'off',
        'n/no-unpublished-import': 'off',
      },
    },
  ],
);
