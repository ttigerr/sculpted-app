module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src',
          '@assets': './assets',
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
          '@img': './assets/img',
        },
      },
    ],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};
