const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({
      // https://github.com/terser-js/terser#compress-options
      terserOptions: {
        ecma: undefined,
        compress: {
          drop_console: true
        },
      }
    })],
  },
});
