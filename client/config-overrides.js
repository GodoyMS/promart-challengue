const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@screens': path.resolve(__dirname, 'src/screens'),

  })
);
