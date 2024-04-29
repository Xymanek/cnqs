module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'linebreak-style': 0,
    'no-multiple-empty-lines': [2, {
      max: 2,
      maxEOF: 1, // Changed - we want a single line for diff friendliness when adding more things to the file
    }],
  },
};
