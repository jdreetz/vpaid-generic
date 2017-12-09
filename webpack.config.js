const path = require('path'), 
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      HTMLWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
      HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const paths = {
  DEMO: path.resolve(__dirname, 'demo'),
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
  entry: { 
    index: path.join(paths.JS, 'index.js'),
    demo: path.join(paths.DEMO, 'demo.js')
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  plugins: [ 
    new HTMLWebpackPlugin({ 
      filename: 'IMA-VPAID-Host.html',
      template: path.join(paths.DEMO, 'IMA-VPAID-Host.html'),
      excludeAssets: [/index\.bundle\.js/]
    }),
    new HTMLWebpackIncludeAssetsPlugin({ 
      assets: [
        'demo/ad-tag.js', 
        'demo/IMA-VPAID-Host.css', 
        'demo/IMA-VPAID-Host.js'
      ], 
      append: true
    }),
    new HtmlWebpackExcludeAssetsPlugin()
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
  devtool: 'source-map'
};