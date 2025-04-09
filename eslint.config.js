import { base } from './eslint.config.base.js';

const toolingFiles = [
  '**/eslint.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',

  './lib/**',
  './prettier.config.*',
];

export default base({ tooling: toolingFiles });
