const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var browserConfig = {
  entry: ['./src/browser/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  mode: 'production',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    mobx: 'mobx',
    'mobx-react': 'mobxReact',
    axios: 'axios'
    // mint: 'mint-ui'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
    // HMR
    new CleanWebpackPlugin(['public']),
    new MiniCssExtractPlugin({
      filename: 'vender.[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    })
    // new WebpackBar({
    //   color: '#f56be2',
    //   name: 'client'
    // })
  ]
}

module.exports = [browserConfig]
