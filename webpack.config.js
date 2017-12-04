const path = require('path'), 
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
  entry: { 
    index: path.join(paths.JS, 'index.js'),
    demo: path.join(paths.JS, 'demo.js')
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  plugins: [ 
    new HTMLWebpackPlugin({ template: path.join(paths.SRC, 'IMA-VPAID-Host.html') }),
    new ExtractTextPlugin('style.bundle.css')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader' })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};