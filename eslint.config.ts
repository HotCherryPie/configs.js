import { base } from './eslint.config.base.ts';

const toolingFiles = [
  '**/eslint.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',

  './prettier.config.*',
];

const node = ['./lib/**'];

export default base({ node, tooling: toolingFiles });
