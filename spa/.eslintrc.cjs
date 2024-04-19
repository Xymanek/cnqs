module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',

    // https://stackoverflow.com/a/65519055/2588539
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  },
};
