const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function () {
  return {
    entry: {
      main: './app/main.jsx',
      vendor: ['react', 'react-dom', 'redux-thunk', 'react-router-dom', 'redux']
    },
    output: {
      path: path.join(__dirname, "../dist"),
      filename: '[name].js',
      chunkFilename: 'js/[name].chunk.js',
      libraryTarget: "umd"
    },
    externals: {
      'BMap': 'BMap'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: [/node_modules/, /pdfmake.js$/],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    '> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'
                  ],
                  // 是否去掉不必要的前缀
                  reomve: true
                })
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: './images/[name].[hash:8].[ext]'
          }
        }
      }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        children: true,
      }),
      new ExtractTextPlugin({
        filename: "css/[contenthash].css"
      }),
      new HtmlWebpackPlugin({
        title: 'Shelelskey Develop',
        template: path.join(__dirname, '../public/index.html'),
        chunks: ['vendor', 'main']
      }),

    ],
  };
}
