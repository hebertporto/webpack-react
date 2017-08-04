const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router',
  'redux', 'redux-form', 'redux-thunk',
]

module.exports = {
  entry: {
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'libs'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'database'),
        ],
        loader: 'eslint-loader',
      },
      {
        use: 'babel-loader',
        test: /\.jsx$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
