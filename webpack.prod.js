const path = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
  entry: { 
    index: path.join(paths.JS, 'index.js')
  },
  output: {
    library: 'VPAIDInterface',
    path: paths.DIST,
    filename: 'VPAIDInterface.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};