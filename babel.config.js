module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-react-compiler',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/presentation/components',
          '@hooks': './src/presentation/hooks',
          '@screens': './src/presentation/screens',
          '@domain': './src/domain',
          '@data': './src/data',
          '@core': './src/core',
          '@di': './src/di',
        },
      },
    ],
  ],
};
