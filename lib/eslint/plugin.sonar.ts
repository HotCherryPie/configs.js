import sonar from 'eslint-plugin-sonarjs';

import { renamePluginScope } from './utils.ts';

const name = 'sonar';

const rules = {
  recommended: renamePluginScope(
    sonar.configs.recommended.rules,
    'sonarjs',
    name,
  ),
};

export const pluginSonar = {
  name,
  plugin: sonar,
  rules,
};
