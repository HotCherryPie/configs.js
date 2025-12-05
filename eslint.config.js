export { configArgyle } from '@my/configs.js-public/eslint/config.argyle.js';

const toolingFiles = [
  '**/eslint.config.*',
  '**/prettier.config.*',
  '**/tsup.config.*',
  '**/vite.config.*',

  '!./lib/**/*.*',
];

const node = ['./lib/**'];

export default configArgyle({ node, tooling: toolingFiles });
