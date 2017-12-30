'use strict'
const webpack = require('webpack')
const path = require('path')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const config = {
  context: path.resolve(__dirname, 'client'),
  entry: {
    index: './index.js',
    app: './app.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: path.resolve(__dirname, 'client'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }, 
  plugins: [
    extractCommons
  ]
};

module.exports = config