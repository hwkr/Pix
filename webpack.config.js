var webpack = require('webpack');
var path = require('path');

var Configuration = require('./config.json');

module.exports = {
  entry: {
    client: './src/client',
    view: './src/view',
  },
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|svg|json|mp3|ttf|eot|woff2?)$/, loader: 'file' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  externals: {
    config: JSON.stringify(Configuration),
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
