import { base } from './eslint.config.base.js';

const toolingFiles = [
  '**/eslint.config.*',
  '**/prettier.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',

  '!./lib/**/*.*',
];

const node = ['./lib/**'];

export default base({ node, tooling: toolingFiles });
