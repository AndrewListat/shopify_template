const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

let {
  DEBUG_MODE,
  NODE_ENV,
  // eslint-disable-next-line no-process-env
} = process.env;

DEBUG_MODE = 'true';
// NODE_ENV = 'production';

module.exports = {
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  watch: DEBUG_MODE === 'true',
  devtool: NODE_ENV === 'production' ? undefined : 'inline-source-map',
  entry: './index.js',
  output: {
    filename: 'widget.js',
    library: 'lsNetvisioBanner',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {}], '@babel/preset-react'],
            plugins: [
              'babel-plugin-styled-components',
              'babel-plugin-transform-class-properties',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG_MODE,
    }),
  ],
};
