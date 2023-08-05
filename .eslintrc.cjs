module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': ['error', 'ignorePackages', { '': 'never' }],
    'max-len': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'linebreak-style': 0,
  },
};
