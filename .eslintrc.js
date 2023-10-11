module.exports = {
  extends: '@antfu',
  ignorePatterns: ['.husky', 'dist', 'public', 'node_modules', '*.json'],
  rules: {
    'unused-imports/no-unused-imports': 0,
  },
}
