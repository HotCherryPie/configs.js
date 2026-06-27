import sonar from 'eslint-plugin-sonarjs';

import { renamePluginScope } from './utils.js';

const name = 'sonar';

// https://github.com/SonarSource/SonarJS/tree/master/packages/analysis/src/jsts/rules#rules
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
