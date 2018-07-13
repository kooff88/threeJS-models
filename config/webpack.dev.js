const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');


module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, "../app"),
      compress: true,
      host: 'localhost',
      port: 3001,
    }
  })
}
