import { base } from './eslint.config.base.js';

const toolingFiles = [
  'lib/**',
  '**/eslint.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',
  'prettier.config.*',
];

export default base({ tooling: toolingFiles });
