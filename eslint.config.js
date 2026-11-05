import { getTsConfigIncludedFiles } from '#lib/utils';

import { base } from './eslint.config.base.js';

const node = ['./lib/**'];

export default base({ node, tooling: getTsConfigIncludedFiles('./tsconfig.tooling.json') });
