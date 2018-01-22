const path = require('path'),
      webpack = require('webpack'), 
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
    test: path.join(paths.TEST, 'index.js'),
    openvv: path.join(paths.DEMO, '/OpenVV/openvv-demo.js'),
    adtag: path.join(paths.DEMO, '/Common/getAdTag.js')
  },
  output: {
    path: paths.DEMO,
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  plugins: [ 
    new HTMLWebpackPlugin({ 
      filename: 'IMA-VPAID/IMA-VPAID-Host.html',
      template: path.join(paths.DEMO, '/IMA-VPAID/IMA-VPAID-Host.html'),
      excludeAssets: [/test\.bundle\.js/, /openvv\.bundle\.js/]
    }),
    new HTMLWebpackPlugin({
      filename: 'test.html',
      excludeAssets: [/demo\.bundle\.js/, /adtag\.bundle\.js/, /openvv\.bundle\.js/]
    }),
    new HTMLWebpackPlugin({
      filename: 'OpenVV/openvv-demo.html',
      template: path.join(paths.DEMO, '/OpenVV/openvv-demo.html'),
      excludeAssets: [/demo\.bundle\.js/, /adtag\.bundle\.js/, /test\.bundle\.js/]
    }),
    new HTMLWebpackIncludeAssetsPlugin({ 
      files: ['IMA-VPAID/IMA-VPAID-Host.html'],
      assets: ['IMA-VPAID/IMA-VPAID-Host.css', 'IMA-VPAID/IMA-VPAID-Host.js'], 
      append: true
    }),
    new webpack.DefinePlugin({
      HOST: JSON.stringify('http://localhost:8080/')
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
      },
      {
        test: /\.xml$/,
        use: 'raw-loader'
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