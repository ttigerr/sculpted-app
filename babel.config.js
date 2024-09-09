module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@ui-library': './src/modules/core/ui-library',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/config/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  presets: ['module:@react-native/babel-preset'],
};
