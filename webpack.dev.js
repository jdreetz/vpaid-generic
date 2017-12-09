const path = require('path'), 
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      HTMLWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
      HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const paths = {
  TEST: path.resolve(__dirname, 'test'),
  DEMO: path.resolve(__dirname, 'demo'),
  JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
  entry: { 
    demo: path.join(paths.DEMO, 'demo.js'),
    test: path.join(paths.TEST, 'index.js')
  },
  output: {
    path: paths.DEMO,
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  plugins: [ 
    new HTMLWebpackPlugin({ 
      filename: 'IMA-VPAID-Host.html',
      template: path.join(paths.DEMO, 'IMA-VPAID-Host.html'),
      excludeAssets: [/test\.bundle\.js/]
    }),
    new HTMLWebpackPlugin({
      filename: 'test.html',
      excludeAssets: [/demo\.bundle\.js/]
    }),
    new HTMLWebpackIncludeAssetsPlugin({ 
      files: ['IMA-VPAID-Host.html'],
      assets: [
        'ad-tag.js', 
        'IMA-VPAID-Host.css', 
        'IMA-VPAID-Host.js'
      ], 
      append: true
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ],
  devServer: {
    contentBase: './demo'
  },
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
  devtool: 'inline-source-map',
  node: {
   fs: 'empty'
  }
};