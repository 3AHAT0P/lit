module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/common', './src/common/'],
          ['@/logicThread', './src/logicThread/'],
          ['@/uiThread', './src/uiThread/'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      },
    },
  },
  rules: {
    // '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'prefer-destructuring': 0,
    'max-len': [2, 120],
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'lines-between-class-members': 0, // @TODO:
    'import/extensions': [
      2,
      {
        js: 'never',
        ts: 'never',
        json: 'always',
      },
    ],
  }
};
