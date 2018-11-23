const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var browserConfig = {
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    './src/browser/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3001/'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    mobx: 'mobx',
    'mobx-react': 'mobxReact',
    axios: 'axios'
    // mint: 'mint-ui'
  },
  mode: 'development',
  devtool: 'inline-source-map',
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
          'css-hot-loader',
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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['public']),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'vender.css',
      chunkFilename: '[name].css'
    }),
    new WebpackBar({
      color: '#f56be2',
      name: 'client'
    })
  ]
}

module.exports = [browserConfig]
