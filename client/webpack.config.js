const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: ['index.js',]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build/[name].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
          options: {
            limit: 10000
          }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build/[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'WEBPACK': JSON.stringify(process.env.WEBPACK || ''),
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  watchOptions: {
    poll: 2000,
    ignored: /node_modules/,
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'pages'),
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080,
    publicPath: '/'
  }
}
