import { base } from './eslint.config.base.js';
import { pluginN } from './lib/eslint/plugin.n.js';
import { runtimeNode } from './lib/eslint/runtime.node.js';

export default base([
  runtimeNode(
    'root/runtime:node',
    ['lib/**', '**/eslint.config.*', '**/tsup.config.*', '**/vite.config.*'],
    {
      rules: {
        ...pluginN.rules.recommended,
      },
    },
  ),
]);
