'use strict'

const path = require('path');
const { resolve } = path

// var PLUGINS = [];
// if (process.env.NODE_ENV === 'production') {
//   PLUGINS.push(new webpack.optimize.UglifyJsPlugin());
// }

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './bundle.js'
  },
  // plugins: PLUGINS,
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './client'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

module.exports = config