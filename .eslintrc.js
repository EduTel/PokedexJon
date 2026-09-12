module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: [
        '**/__tests__/**/*',
        '**/test-utils/**/*',
        'jest.setup.js',
        'jest.config.js',
      ],
    },
  ],
};
