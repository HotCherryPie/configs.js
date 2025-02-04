import configPrettier from 'eslint-config-prettier';

// WARN: renaming plugin scopes can prevent this config from working!
export const configCompatPrettier = () => [
  {
    name: 'compatibility/prettier',
    rules: configPrettier.rules,
  },
];
