import { base } from './eslint.config.base.js';

export default base(
  {
    node: ['lib/**', '**/eslint.config.*', '**/tsup.config.*', '**/vite.config.*'],
  },
  [
    {
      name: 'root/tooling',
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
);
