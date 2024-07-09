const path = require('path');

const importResolverExtensions = ['.js', '.jsx', '.jx', '.ts', '.tsx', '.tx'];

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, './src/')]],
        extensions: importResolverExtensions,
      },
      node: {
        extensions: importResolverExtensions,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.tx'],
    },
    'import/order': [
      'error',
      {
        'newlines-between': 'always', // always or never
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: {
          order: 'asc', // asc or desc
          caseInsensitive: true,
        },
      },
    ],
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['import'],
};
