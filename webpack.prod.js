const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'vender.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  mode: 'production',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    mobx: 'mobx',
    'mobx-react': 'mobxReact',
    axios: 'axios',
    // mint: 'mint-ui'
  },
  resolve: {
    alias: {
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      style: resolve('src/static/style'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'images/[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      // favicon: './src/favicon.ico',
      template: './index.prod.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(['public']),
    new CopyWebpackPlugin([{
      from: './src/assets',
    }]),
    new MiniCssExtractPlugin({
      filename: 'vender.[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    // moment 只打包 cn locale
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new WebpackBar({
      color: '#f56be2',
    }),
  ],
};
