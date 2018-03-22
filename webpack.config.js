var path = require('path');

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: path.resolve(__dirname, 'build/public/scripts'),
    filename: 'mmc.bundle.js',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /(node_modules)/, use: 'babel-loader' }],
  },
};
