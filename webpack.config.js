'use strict'

const webpack = require('webpack');
const path = require('path');

var PLUGINS = [];

if (process.env.NODE_ENV === 'production') {
  PLUGINS.push(new webpack.optimize.UglifyJsPlugin());
}

const config = {
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './bundle/bundle.js'
    }, 
    plugins: PLUGINS
}; 

module.exports = config